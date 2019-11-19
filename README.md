```bash
$ pip install djangorestframework
$ pip install djangorestframework-jwt
$ pip install django-cors-headers
```

후에 Settings.py 에 추가해줘야한다.

```python 
# Third party apps
'rest_framework',
'corsheaders',
```

django rest framework jwt 공홈가서

```python
# https://jpadilla.github.io/django-rest-framework-jwt/#usage
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# https://jpadilla.github.io/django-rest-framework-jwt/#additional-settings
JWT_AUTH = {
    # Token 을 서명할 시크릿 키를 등록 (절대 외부 노출 금지). defalult 가 settings.SECRET_KEY 이긴함.
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_ALLOW_REFRESH': True,
    # default 유효기간은 5분, 직므은 1주일간 유효한 토큰으로 설정
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7), # datatime module 필요
    # 28일 마다 토큰이 갱신(유효기간 연장시)
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
}
```
복사 후 settings.py 에 붙여넣기


cors headers 도 추가
```python
MIDDLEWARE = [
    # https://github.com/adamchainz/django-cors-headers
    'corsheaders.middleware.CorsMiddleware',

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8080",
]

# CORS_ORIGIN_ALLOW_ALL = True 어디에서든(오픈  api) 접근가능
```