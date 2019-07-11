# pasta_project project.
# Django 2.2.1.
# https://docs.djangoproject.com/en/2.2/topics/settings/
# https://docs.djangoproject.com/en/2.2/ref/settings/

import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
if DEBUG:
    SECRET_KEY = '&d6-=yx538+hpw(s#^^=1faguzh7^z(86y9@bqr2$6yx--en_v'
else:
    SECRET_KEY = os.environ['SECRET_KEY']


if DEBUG:
    ALLOWED_HOSTS = []
else:
    ALLOWED_HOSTS = ['67.205.129.167']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Local
    'pasta_project.core',

    # 3rd party
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_auth.registration',
    'drf_yasg',
]

SITE_ID = 1 # <--allauth

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pasta_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'pasta_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'pasta',
            'USER': 'flyingspaghettimonster',
            'PASSWORD': '',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'pasta',
            'USER': 'flyingspaghettimonster',
            'PASSWORD': os.environ['BDD_PASSWORD'],
            'HOST': 'localhost',
            'PORT': '',
        }
    }


# https://docs.djangoproject.com/fr/2.2/topics/auth/customizing/#substituting-a-custom-user-model

AUTH_USER_MODEL = 'core.User'


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Password Hash algorithm - Argon2
# https://docs.djangoproject.com/fr/2.2/topics/auth/passwords/

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static/')


# Email
# https://docs.djangoproject.com/en/2.1/topics/email/

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# https://www.django-rest-framework.org/api-guide/permissions/#setting-the-permission-policy

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    # https://www.django-rest-framework.org/api-guide/pagination/#html-pagination-controls
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'PAGE_SIZE': 3,
}


# https://django-rest-auth.readthedocs.io/en/latest/configuration.html

LOGOUT_ON_PASSWORD_CHANGE = False


# https://django-allauth.readthedocs.io/en/latest/installation.html

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

LOGIN_REDIRECT_URL = 'user'


# https://pypi.org/project/django-cors-headers/

if DEBUG:
    CORS_ORIGIN_WHITELIST = (
        'localhost:3000',
        'localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
    )
else:
    CORS_ORIGIN_WHITELIST = (
        'http://162.243.162.246',
    )


# https://docs.djangoproject.com/en/2.1/ref/settings/#media-url

MEDIA_URL = '/media/'


# https://docs.djangoproject.com/en/2.1/ref/settings/#media-root

MEDIA_ROOT = os.path.join(BASE_DIR, "media")


DEFAULT_FROM_EMAIL = 'pasta <noreply@pasta.com>'

ADMINS = [('nico', 'ballonposte@gmail.com')]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

SERVER_EMAIL = 'noreply@pasta.com'

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.environ['EMAIL_HOST_PASSWORD']
EMAIL_PORT = 587
EMAIL_USE_TLS = True