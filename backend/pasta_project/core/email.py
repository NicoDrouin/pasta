from django.core.mail import EmailMessage


def welcome_email(to, username, password):
    msg = 'Welcome ' + username + ' you are here now.<br>Your password is: ' + password
    email_message(to, msg)


def email_message(to, msg):
    email = EmailMessage(
        'Pastafariste Research',
        msg,
        'god@pastaforever.com',
        [to],
    )
    email.content_subtype = "html"
    email.send()