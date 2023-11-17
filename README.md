# 개인 Trouble Shooting

## 1. 해당 경로에 중복된 package.json이 이미 있음

```bash
/var/www/html/package.json.lock

The deployment failed because a specified file already exists at this location
```

### appspec.yml

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

## 2. React hook 의존성 문제

```bash
BoardDetail.js line24, BoardList.js line24
React Hook useEffect Has a Missing Dependency
```

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

## 3. Permission 에러

## deploy.yml

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
