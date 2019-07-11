from django.contrib.auth.models import User
from rest_framework import viewsets, generics, views
from pasta_project.core.serializers import UserSerializer, ParentsSerializer, DnaFileSerializer, ReportsForOneParentSerializer
from .models import User, Parents, DnaFile
from rest_framework.permissions import AllowAny
# from rest_framework.permissions import IsAdminUser, SAFE_METHODS, AllowAny
# from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework import status



# ======================
#  USERS
# ======================
 
class UserSerializer(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all().order_by('-id')
        else: 
            return User.objects.filter(id=self.request.user.id)
    serializer_class = UserSerializer



# ======================
#  PARENTS
# ======================

# List of parents for a specific user defined with his ID
class ParentsForUserListView(generics.ListAPIView):
    def get_queryset(self):
        return Parents.objects.filter(user_id=self.kwargs['user_id']).order_by('-id')
    serializer_class = ParentsSerializer


# List of all parents
class ParentsListView(generics.ListAPIView):
    def get_queryset(self):
        if self.request.user.is_staff:
            return Parents.objects.all().order_by('-id')
        else: 
            return Parents.objects.filter(user_id=self.request.user.id).order_by('-id')
    serializer_class = ParentsSerializer


# Create a parent
class ParentsCreateView(generics.CreateAPIView):
    # permission_classes = (IsAdminUser,)
    # queryset = Parents.objects.all()
    def get_queryset(self):
        if self.request.user.is_staff:
            return Parents.objects.all()
        else: 
            return Parents.objects.filter(user_id=self.request.user.id)
    serializer_class = ParentsSerializer


# Update/Edit a parent
class ParentsUpdateView(generics.UpdateAPIView):
    lookup_field = 'id'
    def get_queryset(self):
        if self.request.user.is_staff:
            return Parents.objects.all()
        else: 
            return Parents.objects.filter(user_id=self.request.user.id)
    serializer_class = ParentsSerializer


# Delete a parent
class ParentsDeleteView(generics.DestroyAPIView):
    lookup_field = 'id'
    def get_queryset(self):
        if self.request.user.is_staff:
            return Parents.objects.all()
        else: 
            return Parents.objects.filter(user_id=self.request.user.id)
    serializer_class = ParentsSerializer


# Detail of one parent defined with his ID
class ParentsDetailView(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = Parents.objects.all()
    serializer_class = ParentsSerializer



# ======================
#  DNA FILES
# ======================

# List of all DNA files for a specific user
class DnaFileListView(generics.ListAPIView):
    def get_queryset(self):
        return DnaFile.objects.filter(parents_id=self.kwargs['parents_id']).order_by('-id')
    serializer_class = DnaFileSerializer


# Upload DNA files
class UploadDnaFileView(views.APIView):
    parser_classes = (MultiPartParser, FormParser,)

    def post(self, request, *args, **kwargs):
        fileSerializer = DnaFileSerializer(data=request.data)
        if fileSerializer.is_valid():
            fileSerializer.save()
            return Response(fileSerializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(fileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ======================
#  REPORTS
# ======================

class ReportView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    lookup_field = 'private_url'
    queryset = Parents.objects.all()
    serializer_class = ReportsForOneParentSerializer
