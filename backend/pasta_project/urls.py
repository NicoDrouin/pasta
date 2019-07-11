from django.urls import include, path
from rest_framework import routers
from pasta_project.core import views
from django.contrib import admin

from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# https://github.com/axnsan12/drf-yasg#id5

schema_view = get_schema_view(
   openapi.Info(
      title="The Flying Spaghetti Monster.",
      default_version='alpha.19.07.01.a',
      description="May parmesan be upon His noodly appendage.",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


router = routers.DefaultRouter()
router.register(r'user', views.UserSerializer, basename='User')

urlpatterns = [
    path('', include(router.urls)),
    path('parents/create/', views.ParentsCreateView.as_view(), name='parents_create'),
    path('parents/edit/<id>/', views.ParentsUpdateView.as_view(), name='parents_edit'),
    path('parents/all/', views.ParentsListView.as_view(), name='parents_list'),
    path('parents/<user_id>/', views.ParentsForUserListView.as_view(), name='parents_for_user_list'),
    path('parents/delete/<id>/', views.ParentsDeleteView.as_view(), name='parents_delete'),
    path('parents/detail/<id>/', views.ParentsDetailView.as_view(), name='parents_detail'),

    path('dnaFileForUniqueParents/<parents_id>/', views.DnaFileListView.as_view(), name='dna_files_for_unique_parents'),
    path('uploadDnaFiles/', views.UploadDnaFileView.as_view(), name='upload_dna_files'),

    path('report/<private_url>/', views.ReportView.as_view(), name='report'),

    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    path('admin/', admin.site.urls),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]


# https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
