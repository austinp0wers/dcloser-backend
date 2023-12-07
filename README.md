<h1>D.CLOSER</h1>

<h2>D.CLOSER가 제공하는 가치</h2>
<li>스마트 견적서는 입력된 정보를 기반으로 자동으로 계산하여 정확한 견적서를 생성하며, 견적서 작성 프로세스에서 발생하는 <b>인적 오류를 최소화</b>할 수 있습니다.
</li>
<li>스마트 견적서는 기존의 견적서 작성 프로세스를 개선하고, 보다 효율적이고 정확한 견적서 작성을 지원합니다.
</li>
<li> 사용자는 스마트 견적서를 통해 제품, 가격, 할인 등의 정보를 쉽게 입력하고, 고객의 요구 사항에 따라 적절한 옵션을 제공할 수 있습니다.
</li>
<li>D.CLOSER는 클라우드 서비스를 기반으로 B2B 영업조직에게 원스톱 Deal Closing 서비스를 제공하는 SaaS 기업입니다. D.CLOSER는 영업팀이 계약서 작성, 결재 및 관리, e-Signature, 수금 등의 프로세스를 간편하고 신속하게 처리할 수 있도록 지원합니다.
</li>

<hr>

<h2>D.CLOSER의 핵심 기능</h2>

<h3>견적서 작성 및 관리</h3>
<li>D.CLOSER는 사용자가 템플릿을 이용해 간단하게 견적서를 작성할 수 있도록 지원하며, 기존 견적서를 업로드하거나 D.CLOSER 내에서 작성된 견적서를 관리할 수 있습니다.</li>

<li>D.CLOSER는 사용자 친화적인 UI/UX로 사용이 간편하며, 기업 규모에 상관없이 모든 B2B 영업조직에게 적용할 수 있습니다. 또한, 클라우드 기반 SaaS 서비스이기 때문에, 보안성과 가용성이 뛰어나며, 이를 통해 사용자는 언제 어디서든 서비스를 이용할 수 있습니다.</li>

<hr>

## 폴더 구조

    ├── src
    │   ├── common                  # 공통적인 코드베이스 로직, 혹은 enum이 저장되어 있는 폴더 입니다.
    │   ├── database        
    │       └── migrations          # DB migration 스크립트가 포함되어 있는 폴더 입니다.
    │   ├── exceptions              # 공통적으로 사용될 에러 객체들이 저장되어 있는 폴더 입니다.
    │   ├── filters                 # Filter들이 저장되어 있는 폴더입니다.
    │   ├── interceptors            # Interceptor들이 저장되어 있는 폴더 입니다.
    │   ├── middlewares             # Middleware들이 포함되어 있는 폴더 입니다.
    │   └── modules                 # module, controller, service, repository가 포함되어 있는 폴더입니다.
    │       ├── auth                # 로그인및 인증관련 모듈 입니다.
    │       ├── customerCompany     # 고객사 관련 API들과 로직이 포함되어있는 모듈 입니다.
    │       ├── product             # 제품 관련 API와 로직을 처리하는 모듈 입니다.
    │       ├── proposal            # 견적서 관련 API들이 포함되어 있는 모듈입니다.
    │       └── user                # 고객 관련 API들이 포함되어 있는 모듈입니다.
    │   └── shared                  # 사용하는 Configuration들과, slack 서비스, swagger 셋업 관련 폴더 입니다.
    ├── README.md
    └── packages.json



## ERD
![ERD](./public/dcloser.png)


## 아키텍처

기본적으로 Nest 에서 제공하는 Dependency Injection을 사용하였으며
모듈 단위기준은, Microservice로 분리를 한다고 하였을떄 로직적으로 영향이없게 설계를 하였습니다.

최대한 Nest.js 프레임워크에서 설명하는 Request 싸이클에서 맞는 stage들에 맞는 로직들을 넣으려고 하였습니다.
예를 들어 
처음API 요청이 들어오면 Middleware에서 권한검증 -> 
로직 수행 중 에러 발생->
Error interceptor를 통한 error custom에러 객체로 형태변환 -> 
filter에서 custom error를 최종적으로 처리.

비즈니스적으로 확장을 할 것을 고려하였을때, Payments 모듈이 들어오게 되면 modules directory에 추가만 하면 됩니다.
