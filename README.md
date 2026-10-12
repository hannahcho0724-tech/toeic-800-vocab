# 800한권으로끝내는실전1 단어장 — GitHub 업로드 안내

TEST 01~05, 각 200개(총 1,000개 항목)의 핵심 뜻과 회사·일상생활 예문/청크가 포함되어 있습니다.
전체 단어장, A~D 선택, 단어·뜻·예문 검색, 뜻·해석 가리기, 인쇄, 랜덤 4지선다 40문항, 랜덤 주관식 40문항을 제공합니다.
예문 앞의 숫자는 왼쪽 뜻의 번호와 연결됩니다. 퀴즈 예문은 제출 후 공개됩니다.

## 아이패드에서 처음 올리기

1. ZIP을 다운로드하고 ‘파일’ 앱에서 한 번 눌러 압축을 풉니다.
2. Safari에서 https://github.com 에 로그인합니다. 메뉴가 잘 보이지 않으면 ‘데스크탑 웹 사이트 요청’을 선택합니다.
3. 오른쪽 위 + → New repository를 선택합니다. 저장소 이름은 `toeic-800-vocab`로 정합니다. 기존 교재 사이트의 저장소는 선택하지 않습니다.
4. Public을 선택하고 Add a README를 켠 뒤 Create repository를 누릅니다. GitHub Free에서 Pages를 사용하려면 공개 저장소를 사용합니다.
5. Add file → Upload files → choose your files를 누릅니다. 압축을 푼 폴더 **안의 파일**을 선택합니다. ZIP 자체나 폴더 전체를 올리지 않습니다.
6. 꼭 필요한 파일은 `index.html`, `Test01.html`~`Test05.html`, `app.js`, `core.js` 총 8개입니다. 모두 저장소 최상위에 있어야 합니다. README.md도 함께 올려도 됩니다.
7. Commit changes를 눌러 main에 저장합니다. 새 branch로 올렸다면 Pull request를 만들고 main에 Merge한 후 다음 단계로 넘어갑니다.
8. Settings → Pages → Build and deployment에서 Source를 Deploy from a branch로 정합니다.
9. Branch는 main, Folder는 /(root)를 선택하고 Save를 누릅니다.
10. 게시가 완료되면 Pages 화면의 Visit site를 누릅니다. Actions에서 게시 진행 상황을 볼 수 있습니다.
11. 계정 이름이 `hannahcho0724-tech`, 저장소가 `toeic-800-vocab`이면 주소는 https://hannahcho0724-tech.github.io/toeic-800-vocab/ 입니다. 실제 주소는 GitHub Pages 화면에서 확인합니다.
12. TEST를 선택하고 ‘전체 200개 단어장’을 눌러 오른쪽 예문 열과 검색, 퀴즈를 확인합니다. Safari 공유 → 홈 화면에 추가로 바로가기를 만들 수 있습니다.

## 파일 위치가 중요한 이유

첫 화면의 `index.html`과 5개 TEST HTML, 2개 JS 파일은 같은 폴더에 있어야 합니다. 파일 이름의 대소문자를 그대로 유지하세요.
`.nojekyll`은 빌드 생략용 빈 파일입니다. 파일 앱에서 숨겨져 선택할 수 없더라도 위 8개의 HTML/JS는 그대로 작동합니다.
별도 프로그램 설치나 npm 빌드가 필요하지 않습니다. 공개한 GitHub Pages 주소는 로그인 없이 접속할 수 있습니다.

## 나중에 내용을 바꾸어 올리기

같은 저장소에서 Add file → Upload files로 새 HTML/JS 파일들을 같은 이름으로 올리고 저장하면 Pages가 다시 게시합니다.
브라우저에 예전 내용이 보이면 페이지를 새로고침합니다.

## 공식 안내

- 파일 업로드: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Pages 게시 설정: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

완성본 파일은 업로드를 준비한 패키지입니다. 사용자의 GitHub 계정에 대신 업로드한 상태는 아닙니다.
