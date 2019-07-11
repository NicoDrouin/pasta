from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, Parents, DnaFile
from django.contrib.auth.hashers import make_password
from pasta_project.core.email import welcome_email




# from django.core.mail import send_mail
# send_mail('Subject here', 'Here is the message.', 'noreply@pasta.com', ['nicosuperstar@yahoo.fr'], fail_silently=False)

# ======================
#  USERS
# ======================

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # email = validated_data['email']
        # username = validated_data['username']
        # password = validated_data.pop('password', None)
        # instance = self.Meta.model(**validated_data)
        if password is not None:
            # welcome_email(email, username, password)
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            # if attr == 'password':
            #     instance.set_password(value)
            # else:
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'entity',
            'title',
            'first_name',
            'last_name',
            'email',
            'address',
            'zip_code',
            'town',
            'phone',
            'is_staff',
        )



# ======================
#  PARENTS
# ======================

class ParentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parents
        fields = (
            'id',
            'user_id',
            'mother_first_name',
            'mother_last_name',
            'father_first_name',
            'father_last_name',
            'private_url',
        )



# ======================
#  DNA FILES
# ======================

class DnaFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = DnaFile
        fields = (
            'id',
            'dna_file',
            'parents_id',
            'name',
            'status',
            'upload_date',
        )



# ======================
#  REPORTS
# ======================

class ReportsSerializer(serializers.ModelSerializer):

    class Meta:
        model = DnaFile
        fields = (
            'name',
            'strenght',
            'dexterity',
            'constitution',
            'intelligence',
            'wisdom',
            'charisma',
        )


# https://stackoverflow.com/a/48429368/2351731
class ReportsForOneParentSerializer(serializers.ModelSerializer):
    file_for_parent = ReportsSerializer(many=True, read_only=True, source="current_parents")

    class Meta:
        model = Parents
        fields = (
            'file_for_parent',
        )
