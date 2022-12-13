# AICTE Chatbot

 <ul style="list-style-type:square;">
  <li>AI based Chatbot to generate answers to queries based on FAQs
using the RASA 3.1 and BERT model.</li>
  <li>BERT Model helps to classify the questions relevancy with an
accuracy of 70% .</li>
  <li>Relevance question dataset is automatically updated by the questions
asked by the user, and is being stored in MYSQL database.</li>
  <li>Voice chat-feature is also provided which enables users to continue their conversation verbally to avoid thier physicall efforts.</li>
</ul> 

## Installation

Python and Rasa needs to be installed

```bash
sudo apt-get install python3.6
```

```bash
python -m pip install --upgrade pip rasa
```

## Usage

Go to the actions folder and run

```bash
rasa run actions.py
```
```bash
rasa run --enable-api --cors="*"
```

Then go to the browser and enter the url **http://127.0.0.1:8000/**


## Screenshots of portal

![alt text](https://i.ibb.co/vLWwVWh/Screenshot-447.png)

![alt text](https://i.ibb.co/jMTGBb0/Screenshot-448.png)

![alt text](https://i.ibb.co/N2wTMVq/Screenshot-449.png)

![alt text](https://i.ibb.co/n0rG2Mt/Screenshot-451.png)

![alt text](https://i.ibb.co/zrRh1Jg/Screenshot-450.png)

![alt text](https://i.ibb.co/Hp5HPWW/Screenshot-452.png)

![alt text](https://i.ibb.co/gTm8pX1/Screenshot-453.png)

![alt text](https://i.ibb.co/gmhPbjg/Screenshot-454.png)

![alt text](https://i.ibb.co/DpkD8qZ/Screenshot-455.png)



