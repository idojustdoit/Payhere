## 구현 기능

![기능12](https://user-images.githubusercontent.com/107375500/190356964-e7c200bd-6587-4416-a60f-5eb934294292.gif)
![로컬스토리지저장](https://user-images.githubusercontent.com/107375500/190357216-74a22405-53b4-45dd-b4b8-6f13c8893733.gif)

1. 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
2. 검색된 Public Repository를 등록할 수 있다.
    - 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
    - 웹은 LocalStorage, 앱은 Async Storage 등 로컬 저장소를 활용한다. (웹 혹은 앱 선택)
3. 등록된 Repository를 삭제할 수 있다.


![기능23](https://user-images.githubusercontent.com/107375500/190357106-311fd780-1735-48e6-9f8c-3f995a8759b1.gif)

4. 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
    - 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
    - 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
    - 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.
