import {
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { SlackService } from 'src/shared/services/slack.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private slackService: SlackService) {}
  catch(exception, host: ExecutionContext) {
    let response = null;
    const context = host.switchToHttp();
    response = context.getResponse<Response>();
    try {
      const status = (exception.getStatus && exception.getStatus()) || 500;
      const exceptionRes = exception.getResponse();
      const errorLog: string = JSON.stringify(exceptionRes.errorLog) || '';
      const errorMsg =
        exceptionRes.customErrorMsg ||
        exceptionRes.message ||
        HttpExceptionFilter.getErrorMsg(status);
      const success: boolean = exceptionRes.success === true;
      const customCode = exceptionRes.code || '';

      let popup: string;
      if (typeof errorLog === 'string' && errorLog.includes('popup')) {
        popup = errorLog.split(':')[1];
      }

      if (!errorLog) {
        const request = context.getRequest<Request>();
        const t_response = exception.getResponse();

        if (t_response.statusCode === 400) {
          console.error(t_response);

          if (request && request.body) {
            delete request.body['password'];
            delete request.body['cardNo'];
            delete request.body['cardPw'];
            delete request.body['expireYear'];
            delete request.body['expireMonth'];
            delete request.body['identifyNumber'];
          }
        } else if (Object.keys(t_response).length !== 0) {
          console.error(t_response);

          if (request && request.body) {
            delete request.body['password'];
            delete request.body['cardNo'];
            delete request.body['cardPw'];
            delete request.body['expireYear'];
            delete request.body['expireMonth'];
            delete request.body['identifyNumber'];
          }

          popup = t_response.err
            ? t_response.err.popup || t_response.err.message || t_response.err
            : '';
        }
      }

      const errorLine: string = exceptionRes.errorLine || '';
      this.slackService.sendErrorMessage(
        this.slackService.getMessgeContents({
          headers: response.req.headers,
          errorMessage: exceptionRes.message ? exceptionRes.message[0] : '',
          body: JSON.stringify(response.req.body),
          method: response.req.method,
          errorLine,
          url: response.req.originalUrl,
          exception: exceptionRes.error,
        }),
      );

      const resObj = {
        code: customCode ? customCode : status,
        success,
        errorMsg,
        popup: popup
          ? popup
          : exceptionRes.popup || HttpExceptionFilter.getErrorMsg(status),
      };

      return response.status(status).json(resObj);
    } catch (err) {
      this.slackService.sendErrorMessage(
        this.slackService.getMessgeContents({
          headers: response.req.headers,
          body: JSON.stringify(response.req.body),
          method: response.req.method,
          // errorLine,
          url: response.req.originalUrl,
          // exception: exceptionRes.error,
        }),
      );

      console.log(err);

      return response.status(500).json({
        code: 500,
        success: false,
        errorMsg: 'Unexpected Error',
        popup: '내부 서버 오류',
      });
    }
  }

  private static getErrorMsg(status: number): string {
    let msg = '';
    switch (status) {
      case 400:
        msg = '잘못된 요청';
        break;
      case 401:
        msg = '권한 없음';
        break;
      case 403:
        msg = '금지된 요청';
        break;
      case 404:
        msg = '찾을 수 없음';
        break;
      case 500:
        msg = '내부 서버 오류';
        break;
      default:
        msg = '예상하지 못한 오류';
        break;
    }
    return msg;
  }
}
