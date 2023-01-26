</br>
<b>개발 환경</b>
   <ol>
      <li>
         IDE
         <ul>
            <li>vscode</li>
         </ul>
      </li>
      <li>
         빌드
         <ul>
            <li>npm create react-app을 사용한 빌드(webpack)</li>
         </ul>
      </li>
      <li>
         기술 스택
         <ul>
            <li>코어 : JSX 문법을 사용한 React </li>
            <li>상태관리 : Redux toolkit</li>
            <li>비동기처리 : Redux thunk</li>
            <li>디자인 : CSS</li>
            <li>아이콘 : MUI(material UI)</li>
         </ul>
      </li>
      <li>
         형상관리
         <ul>
            <li>Git</li>
         </ul>
      </li>
      <li>
         백엔드 및 DB
         <ul>
            <li>Firebase 혹은 AWS를 사용하여 대체</li>
         </ul>
      </li>
   </ol>

</br>
<b>코드 작성 규칙</b>
   <ol>
      <li>
         HTML 클래스 명
         <ul>
            <li>snake_case 사용</li>
         </ul>
      </li>
      <li>
         JS 변수명
         <ul>
            <li>camelCase 사용</li>
            <li>var를 사용한 변수 선언 금지</li>
            <li>값을 직접 바꿀 필요가 없는 변수는 const로 선언</li>
         </ul>
      </li>
      <li>
         component명
         <ul>
            <li>PascalCase 사용</li>
         </ul>
      </li>
      <li>
         함수명
         <ul>
            <li>camelCase 사용</li>
            <li>함수 선언시 화살표 함수 사용</li>
            <li>함수의 역할을 잘 표현하고 동사로 시작하는 함수명 사용(ex : getEmployeeData)</li>
            <li>이벤트 처리 시 이벤트 처리 함수를 별도로 선언(HTML 태그 내 익명함수 사용 금지)</li>
         </ul>
      </li>
      <li>
         디자인
         <ul>
            <li>css module을 사용해 컴포넌트별 디자인 적용</li>
            <li>폰트사이즈, 색상은 css의 root로 규정된 것만 사용</li>
            <li>폰트는 OOO(미정)으로 통일</li>
         </ul>
      </li>
      <li>
         주석
         <ul>
            <li>모든 컴포넌트, 함수, 변수의 역할에 대한 주석 작성 필수</li>
         </ul>
      </li>
      <li>
         기타 사항
         <ul>
            <li>querySelector 등으로 실제 DOM에 직접 접근 금지</li>
         </ul>
      </li>
   </ol>
<br>
<b>화면 너비 정의(반응형)</b>
  <ul>
    <li>
      pc 기준(large) : 1300px 이상
    </li>
    <li>
      태블릿 기준(medium) : 768px ~ 1300px
    </li>
    <li>
      모바일 기준(small) : 768px 이하
    </li>
  </ul>
