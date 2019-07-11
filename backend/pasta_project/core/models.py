from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
import random


class User(AbstractUser):
    entity = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=16, blank=True)
    town = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=16, blank=True)
    Dr = 'Dr'
    Ms = 'Ms'
    Mr = 'Mr'
    Professor = 'Professor'
    TITLE = (
        (Dr, 'Dr'),
        (Ms, 'Ms'),
        (Mr, 'Mr'),
        (Professor, 'Professor'),
    )
    title = models.CharField(max_length=16, choices=TITLE, blank=True)
    is_staff = models.BooleanField(default=False)
    note = models.TextField()

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return  self.title + ' ' + self.first_name + ' ' + self.last_name + ' - ' + self.entity



class Parents(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    mother_first_name = models.CharField(max_length=50, blank=True)
    mother_last_name = models.CharField(max_length=50, blank=True)
    father_first_name = models.CharField(max_length=50, blank=True)
    father_last_name = models.CharField(max_length=50, blank=True)
    private_url = models.UUIDField(default=uuid.uuid4)

    def __str__(self):
        return self.mother_first_name + ' ' + self.mother_last_name + ' - ' + self.father_first_name + ' ' + self.father_last_name

    def current_parents(self):
        return DnaFile.objects.filter(parents_id=self)



def user_directory_path(instance, filename): # <-- TODO: create separate dir per user and parents
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    # return 'user_{0}/{1}'.format(instance.user.id, filename)
    return 'dna_files/{0}'.format(filename)

class DnaFile(models.Model):
    parents_id = models.ForeignKey(Parents, related_name="file_for_parent", on_delete=models.CASCADE)
    dna_file = models.FileField(upload_to=user_directory_path)
    name = models.CharField(null=False, max_length=50)
    status = models.CharField(null=False, max_length=16, default='Uploading')
    upload_date = models.DateTimeField(auto_now_add=True)
    # https://docs.djangoproject.com/en/2.2/ref/contrib/postgres/fields/#arrayfield
    strenght = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))
    dexterity = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))
    constitution = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))
    intelligence = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))
    wisdom = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))
    charisma = models.PositiveSmallIntegerField(null=False, default=random.randint(0,7))

    def __str__(self):
        return self.parents_id.mother_first_name + ' ' + self.parents_id.mother_last_name + ' - ' + self.parents_id.father_first_name + ' ' + self.parents_id.father_last_name
