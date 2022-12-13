import logging
import smtplib
import traceback
from email.message import EmailMessage
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def send_email(subject:str, recipient_email:str, content:str):
    msg = EmailMessage()
    msg.set_content(content)
    msg['Subject'] = subject
    msg['From'] = "aicte.customer@gmail.com"
    msg['To'] = recipient_email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp_server:
            smtp_server.login("aicte.customer@gmail.com", "gwrhjugtefgmcqfn")
            smtp_server.send_message(msg)
            smtp_server.quit()
        return True
    except Exception as error:
        logger.error(f"Error: {error}")
        logger.info(traceback.print_exc())
        return False