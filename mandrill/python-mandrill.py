"""
Parameters can and should be rewritten as literals: written as callables
here for portability/transparency.
"""
import mandrill

def generate_mandrill_client(api_key):
    return mandrill.Mandrill(api_key)


def send_mandrill_email(mandrill_client, sending_email, name_of_sender,
                        message_subject, html_message_body, email_of_recipient,
                        name_of_recipient, reply_to_address):
    """ Sends an email, given a client generated above
    :params: given; html_message_body is a sting containing raw html
     (no doctype/html tags) are needed.
    :return: True on successful send
    """
    try:
        message = {
            'auto_html': None,
            'auto_text': None,
            'from_email': sending_email,
            'from_name': name_of_sender,
            'headers': {
                'Reply-To': reply_to_address
            },
            'subject': message_subject,
            'html': html_message_body,
            'to': [{
                'email': email_of_recipient,
                'name': name_of_recipient,
                'type': 'to'
                }]
        }
        mandrill_client.messages.send(
            message=message, async=False, ip_pool='Main Pool')
        return True

    except mandrill.Error, e:
        print 'A mandrill error occurred: %s - %s' % (e.__class__, e)
        raise
