import mysql.connector

def DataUpdate(Name,Number,Email):
    mydb=mysql.connector.connect(  
      host="localhost",
      user="root",
      auth_plugin="mysql_native_password",
      passwd="write ur password here",
      database="Rasa_feedback" #subject to change
    )

    mycursor = mydb.cursor()

    # sql = "CREATE TABLE chat_bot (Name VARCHAR(255),Number VARCHAR(255),Email VARCHAR(255))"
    sql='INSERT INTO chat_bot (Name,Number,Email) VALUES ("{0}","{1}","{2}"); '.format(Name,Number,Email) 
    mycursor.execute(sql) 
    mydb.commit()

def faq_DataUpdate(faq):
    mydb=mysql.connector.connect(  
      host="localhost",
      user="root",
      auth_plugin="mysql_native_password",
      passwd="Ayush@123",
      database="Rasa_feedback"
    )

    mycursor = mydb.cursor()

    # sql = "CREATE TABLE faq_set (faq VARCHAR(255))"
    sql='INSERT INTO faq_set (faq) VALUES ("{0}"); '.format(faq) 
    mycursor.execute(sql) 
    mydb.commit()

#if __name__=="__main__":
#    faq_DataUpdate("what is mooc") 
