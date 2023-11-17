# 빌드 및 배포 Trouble Shooting

## 1. React hook 의존성 문제

```bash
Failed to compile.

[eslint]
src/board/BoardDetail.js
  Line 25:8:  React Hook useEffect has a missing dependency: 'boardIdx'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

src/board/BoardList.js
  Line 25:8:  React Hook useEffect has a missing dependency: 'history'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
```

### BoardDetail.js, BoardList.js 코드 수정

```jsx
...
...
useEffect(() => {
        axios.get(`${process.env.REACT_APP_BOARD_API_URL}/board/${boardIdx}`)
            .then(response => {
                const body = JSON.parse(response.data.body);
                console.log(body);
                setBoard(body);
                setTitle(body.title);
                setContents(body.contents);
            })
            .catch(error => console.log(error));

# 이 부분 추가 #
    // eslint-disable-next-line react-hooks/exhaustive-deps
################

    }, []);
...
...
```

## 2. 해당 경로에 중복된 package.json이 이미 있음

```bash
/var/www/html/package.json.lock

The deployment failed because a specified file already exists at this location
```

### appspec.yml 템플릿 수정

```yaml
version: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html

    # 이 부분 추가 #
    overwrite: yes
file_exists_behavior: OVERWRITE
################

hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      runas: root
  AfterInstall:
    - location: scripts/after_install.sh
      runas: root
```

## 3. Permission 에러

### deploy.yml 템플릿 수정

```yaml
nv:
  AWS_REGION: ap-northeast-2
  S3_BUCKET_NAME: cicd-bucket-rlatkd
  CODE_DEPLOY_APPLICATION_NAME: CicdApplication
  CODE_DEPLOY_DEPLOY_GROUP_NAME: CicdDeployGroup

permissions:
  contents: read

  # 이 부분 추가 #
  id-token: write
################

jobs:
  build:
    runs-on: ubuntu-latest
    environment: production
```
