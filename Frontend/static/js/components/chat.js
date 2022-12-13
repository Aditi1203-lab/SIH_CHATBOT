/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
const converter = new showdown.Converter();
function scrollToBottomOfResults() {
    const terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}


/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
function setUserResponse(message) {
    console.log("set user response")
    const user_response = `<img class="userAvatar" src='./static/img/userAvatar.jpg'><p class="userMsg">${message} </p><div class="clearfix"></div>`;
    $(user_response).appendTo(".chats").show("slow");

    $(".usrInput").val("");
    scrollToBottomOfResults();
    showBotTyping();
    $(".suggestions").remove();
}


/**
 * returns formatted bot response 
 * @param {String} text bot message response's text
 *
 */
function getBotResponse(text) {
    console.log("get bot res")
    console.log(urlify(text))
    botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg">${urlify(text)}</span><div class="clearfix"></div>`;
    return botResponse;
}

/**
 * renders bot response on to the chat screen
 * @param {Array} response json array containing different types of bot response
 *
 * for more info: `https://rasa.com/docs/rasa/connectors/your-own-website#request-and-response-format`
 */

// urlify text
function urlify(text) {
    console.log("wow")
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    console.log(urlRegex)
    return text.replace(urlRegex, function (url) {
        return '<a target="_block" href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
const resumeX = () => {
    console.log("works")
    document.getElementById("userInput").disabled = false;
    document.getElementById("sendButton").style.display = "block";
    document.getElementById("voiceButton").innerHTML = `<img id="imgResumeMicImg" onclick="lolRecord()" src="./static/img/mic.svg" alt="microphone" width="40px">`

}

function setBotResponse(response) {
    console.log("set bot response")
    // renders bot response after 500 milliseconds
    setTimeout(() => {
        hideBotTyping();
        if (response.length < 1) {
            // if there is no response from Rasa, send  fallback message to the user
            const fallbackMsg = "Hello Namaste 🙏 " + "<br>" + "Greetings from AICTE I am AICTE DIGITAL ASSISTANT";

            const BotResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            scrollToBottomOfResults();
        } else {
            // if we get response from Rasa
            for (let i = 0; i < response.length; i += 1) {
                // check if the response contains "text"
                if (Object.hasOwnProperty.call(response[i], "text")) {
                    if (response[i].text == "Bye , See you later") {

                            document.getElementById("userInput").disabled = true;
                            document.getElementById("sendButton").style.display = "none";
                            // document.getElementById('imgResumeMicImg').src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23dGVAYzKPNo02iRJxf66SvkWEQHvVeWuAA&usqp=CAU";
                            document.getElementById("voiceButton").innerHTML = `<img id="imgResumeMicImg" onclick="resumeX()" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64cb3d97-1cb4-496b-8d86-ed9fc6406e56/d6kqyha-da1486b9-d996-4bc5-9ebf-ef64b4d628d7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0Y2IzZDk3LTFjYjQtNDk2Yi04ZDg2LWVkOWZjNjQwNmU1NlwvZDZrcXloYS1kYTE0ODZiOS1kOTk2LTRiYzUtOWViZi1lZjY0YjRkNjI4ZDcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gTOY1meDW6ONSuKHLKSKw7yDLrE20bqAw0M515UIiFc" width="78px" >`
                    
                        }
                    if (response[i].text != null) {
                        // convert the text to mardown format using showdown.js(https://github.com/showdownjs/showdown);
                        let botResponse;
                        // console.log(urlify(response[i].text))
                        let html = converter.makeHtml(response[i].text);
                        html = html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "<b>").replaceAll("</strong>", "</b>");
                        html = html.replace(/(?:\r\n|\r|\n)/g, '<br>')
                        // check for blockquotes
                        if (html.includes("<blockquote>")) {
                            html = html.replaceAll("<br>", "");
                            botResponse = getBotResponse(html);
                        }
                        // check for link
                        // check for image
                        if (html.includes("<img>")) {
                            html = html.replaceAll("<img", '<img src="" class="imgcard_mrkdwn" ');
                            botResponse = getBotResponse(html);
                        }
                        // check for preformatted text
                        if (html.includes("<pre>") || html.includes("<code>")) {

                            botResponse = getBotResponse(html);
                        }
                        // check for list text
                        if (html.includes("<ul>") || html.includes("<ol>") || html.includes("<li") || html.includes('<h3>')) {
                            html = html.replaceAll("<br>", "");
                            // botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg">${html}</span><div class="clearfix"></div>`;
                            botResponse = getBotResponse(html);
                        }
                        else {
                            // if no markdown formatting found, render the text as it is.
                            if (!botResponse) {
                                botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${urlify(response[i].text)}</p><div class="clearfix"></div>`;
                            }
                        }
                        // append the bot response on to the chat screen
                        $(botResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "images"
                if (Object.hasOwnProperty.call(response[i], "image")) {
                    if (response[i].image !== null) {
                        const BotResponse = `<div class="singleCard"><img class="imgcard" src="${response[i].image}"></div><div class="clearfix">`;

                        $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "buttons"
                if (Object.hasOwnProperty.call(response[i], "buttons")) {
                    if (response[i].buttons.length > 0) {
                        addSuggestion(response[i].buttons);
                    }
                }

                // check if the response contains "attachment"
                if (Object.hasOwnProperty.call(response[i], "attachment")) {
                    if (response[i].attachment != null) {
                        if (response[i].attachment.type === "video") {
                            // check if the attachment type is "video"
                            const video_url = response[i].attachment.payload.src;

                            const BotResponse = `<div class="video-container"> <iframe src="${video_url}" frameborder="0" allowfullscreen></iframe> </div>`;
                            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                        }
                    }
                }
                // check if the response contains "custom" message
                if (Object.hasOwnProperty.call(response[i], "custom")) {
                    const { payload } = response[i].custom;
                    if (payload === "quickReplies") {
                        // check if the custom payload type is "quickReplies"
                        const quickRepliesData = response[i].custom.data;
                        showQuickReplies(quickRepliesData);
                        return;
                    }

                    // check if the custom payload type is "pdf_attachment"
                    if (payload === "pdf_attachment") {
                        renderPdfAttachment(response[i]);
                        return;
                    }

                    // check if the custom payload type is "dropDown"
                    if (payload === "dropDown") {
                        const dropDownData = response[i].custom.data;
                        renderDropDwon(dropDownData);
                        return;
                    }

                    // check if the custom payload type is "location"
                    if (payload === "location") {
                        $("#userInput").prop("disabled", true);
                        getLocation();
                        scrollToBottomOfResults();
                        return;
                    }

                    // check if the custom payload type is "cardsCarousel"
                    if (payload === "cardsCarousel") {
                        const restaurantsData = response[i].custom.data;
                        showCardsCarousel(restaurantsData);
                        return;
                    }

                    // check if the custom payload type is "chart"
                    if (payload === "chart") {
                        /**
                         * sample format of the charts data:
                         *  var chartData =  { "title": "Leaves", "labels": ["Sick Leave", "Casual Leave", "Earned Leave", "Flexi Leave"], "backgroundColor": ["#36a2eb", "#ffcd56", "#ff6384", "#009688", "#c45850"], "chartsData": [5, 10, 22, 3], "chartType": "pie", "displayLegend": "true" }
                         */

                        const chartData = response[i].custom.data;
                        const {
                            title,
                            labels,
                            backgroundColor,
                            chartsData,
                            chartType,
                            displayLegend,
                        } = chartData;

                        // pass the above variable to createChart function
                        createChart(
                            title,
                            labels,
                            backgroundColor,
                            chartsData,
                            chartType,
                            displayLegend,
                        );

                        // on click of expand button, render the chart in the charts modal
                        $(document).on("click", "#expand", () => {
                            createChartinModal(
                                title,
                                labels,
                                backgroundColor,
                                chartsData,
                                chartType,
                                displayLegend,
                            );
                        });
                        return;
                    }

                    // check of the custom payload type is "collapsible"
                    if (payload === "collapsible") {
                        const { data } = response[i].custom;
                        // pass the data variable to createCollapsible function
                        createCollapsible(data);
                    }
                }
            }
        }
        $(".usrInput").focus();
    }, 500);

}

let synth = speechSynthesis,
    isSpeaking = true;

const muteBtn = document.getElementById("muteBtn")



console.log(muteBtn)
console.log(muteBtn.classList.value)

muteBtn.addEventListener("click", () => {
    console.log("clicked")
    console.log(muteBtn.classList.value)
    if (muteBtn.classList.value === "muted") {
        muteBtn.classList.remove("muted")
        // muteBtn.innerHTML = "unmuted"
    }
    else {
        muteBtn.classList.add("muted")
        synth.cancel()
        // muteBtn.innerHTML = "muted"
    }
})


// text to speech
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        utterance.voice = voice;
    }
    synth.speak(utterance);
}

function carouselJson(obj) {
    
    console.log(obj.attachment.payload.elements[0].title + "from carousel");
    setTimeout(() => {
        hideBotTyping();
        if (obj.length < 1) {
            // if there is no response from Rasa, send  fallback message to the user
            const fallbackMsg = "Hello Namaste 🙏 " + "<br>" + "Greetings from AICTE I am AICTE DIGITAL ASSISTANT";

            const BotResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            scrollToBottomOfResults();
        } else {
            // if we get response from Rasa
            
            // scrollToBottomOfResults();
            console.log(typeof(obj.attachment.payload.elements[0]));
            showCardsCarousel(obj.attachment.payload.elements);
        }
        $(".usrInput").focus();
    }, 500);

}

/**
 * sends the user message to the rasa server,
 * @param {String} message user message
 */
function send(message) {
    // console.log("send func")
    $.ajax({
        url: rasa_server_url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ message, sender: sender_id }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);
            console.log(botResponse[0].text);
            var obj = botResponse[0];
            if (muteBtn.classList.value !== "muted") {
                textToSpeech(botResponse[0].text)
            }
            if((botResponse[0].text) === undefined){
                console.log(botResponse[0].attachment.payload.elements[0].title);
                carouselJson(obj);
            }       
            
            // if user wants to restart the chat and clear the existing chat contents
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);

                // if you want the bot to start the conversation after restart
                // customActionTrigger();
                return;
            }
            setBotResponse(botResponse);
        },
        error(xhr, textStatus) {
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);
                // if you want the bot to start the conversation after the restart action.
                // actionTrigger();
                // return;
            }

            // if there is no response from rasa server, set error bot response
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
        },
    });
}
/**
 * sends an event to the bot,
 *  so that bot can start the conversation by greeting the user
 *
 * `Note: this method will only work in Rasa 1.x`
 */
// eslint-disable-next-line no-unused-vars
function actionTrigger() {
    $.ajax({
        url: `http://localhost:5005/conversations/${sender_id}/execute`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: action_name,
            policy: "MappingPolicy",
            confidence: "0.98",
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "messages")) {
                setBotResponse(botResponse.messages);
            }
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}

/**
 * sends an event to the custom action server,
 *  so that bot can start the conversation by greeting the user
 *
 * Make sure you run action server using the command
 * `rasa run actions --cors "*"`
 *
 * `Note: this method will only work in Rasa 2.x`
 */
// eslint-disable-next-line no-unused-vars
function customActionTrigger() {
    $.ajax({
        url: "http://localhost:5005/webhook/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            next_action: action_name,
            tracker: {
                sender_id,
            },
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "responses")) {
                setBotResponse(botResponse.responses);
            }
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}



/**
 * clears the conversation from the chat screen
 * & sends the `/resart` event to the Rasa server
 */
function restartConversation() {
    // $("#userInput").prop("disabled", true);
    // destroy the existing chart
    // document.getElementById("myText").disabled = false;
    $(".collapsible").remove();
    console.log("lol")

    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }
    $(".chats").fadeIn();
    $(".chats").html("");
    $(".usrInput").val("");
    send("/restart");
    const fallbackMsg = "Hello Namaste 🙏 " + "<br>" + "Greetings from AICTE I am AICTE DIGITAL ASSISTANT";

    const BotResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

    $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
}
// triggers restartConversation function.
$("#restart").click(() => {
    if (document.getElementById("userInput").disabled == true) {
        document.getElementById("userInput").disabled = false;
        document.getElementById("sendButton").style.display = "block";
        document.getElementById("voiceButton").innerHTML = `<img id="imgResumeMicImg" onclick="lolRecord()" src="./static/img/mic.svg" alt="microphone" width="40px">`

    }
    else {
        document.getElementById("userInput").disabled = false;
        document.getElementById("sendButton").style.display = "initial";
        document.getElementById("voiceButton").style.display = "initial";

    }
    restartConversation();
});

// firing onclick event listener event in new id
$("#NEWiD").click(() => {
    console.log("jkdghkjdfhjk>>>>>>>>>>>>>>>>>>>>>>>");
    document.getElementById("userInput").disabled = false;
    document.getElementById("sendButton").style.display = "initial";
    document.getElementById("imgResumeMicImg").src = "./static/img/mic.svg";
    var element = document.getElementById("NEWiD");
    element.id = "imgResumeMicImg";
    console.log(element);
    // restartConversation();
});

/**
 * if user hits enter or send button
 * */
$(".usrInput").on("keyup keypress", (e) => {
    const keyCode = e.keyCode || e.which;

    const text = $(".usrInput").val();
    let result = text.replace(/^\s+|\s+$/gm, '');
    if (result == "bye") {
        if (keyCode === 13) {

            document.getElementById("userInput").disabled = true;
            document.getElementById("sendButton").style.display = "none";
            // document.getElementById('imgResumeMicImg').src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23dGVAYzKPNo02iRJxf66SvkWEQHvVeWuAA&usqp=CAU";
            document.getElementById("voiceButton").innerHTML = `<img id="imgResumeMicImg" onclick="resumeX()" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64cb3d97-1cb4-496b-8d86-ed9fc6406e56/d6kqyha-da1486b9-d996-4bc5-9ebf-ef64b4d628d7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0Y2IzZDk3LTFjYjQtNDk2Yi04ZDg2LWVkOWZjNjQwNmU1NlwvZDZrcXloYS1kYTE0ODZiOS1kOTk2LTRiYzUtOWViZi1lZjY0YjRkNjI4ZDcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gTOY1meDW6ONSuKHLKSKw7yDLrE20bqAw0M515UIiFc" alt="microphone" width="78px">`
        }


    }

    if (keyCode === 13) {
        if (text === "" || $.trim(text) === "") {
            e.preventDefault();
            return false;
        }
        // destroy the existing chart, if yu are not using charts, then comment the below lines
        $(".collapsible").remove();
        $(".dropDownMsg").remove();
        if (typeof chatChart !== "undefined") {
            chatChart.destroy();
        }

        $(".chart-container").remove();
        if (typeof modalChart !== "undefined") {
            modalChart.destroy();
        }

        $("#paginated_cards").remove();
        $(".suggestions").remove();
        $(".quickReplies").remove();
        $(".usrInput").blur();
        setUserResponse(text);
        send(text);
        e.preventDefault();
        return false;
    }
    return true;
});



$("#sendButton").on("click", (e) => {
    console.log('Send button clicked')
    const text = $(".usrInput").val();

    // console.log(text + "hi am there");
    // console.log(text + "    hi am jjjjjjjjj>>>>>>>>>>>>>>>>>>");
    // let result = text.replace(/^\s+|\s+$/gm, '');
    // if (result == "bye") {

    //     document.getElementById("userInput").disabled = true;
    //     document.getElementById("sendButton").style.display = "none";
    //     // document.getElementById('imgResumeMicImg').src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23dGVAYzKPNo02iRJxf66SvkWEQHvVeWuAA&usqp=CAU";
    //     document.getElementById("voiceButton").innerHTML = `<img id="imgResumeMicImg" onclick="resumeX()" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64cb3d97-1cb4-496b-8d86-ed9fc6406e56/d6kqyha-da1486b9-d996-4bc5-9ebf-ef64b4d628d7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0Y2IzZDk3LTFjYjQtNDk2Yi04ZDg2LWVkOWZjNjQwNmU1NlwvZDZrcXloYS1kYTE0ODZiOS1kOTk2LTRiYzUtOWViZi1lZjY0YjRkNjI4ZDcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gTOY1meDW6ONSuKHLKSKw7yDLrE20bqAw0M515UIiFc" width="78px" >`

    // }
    if (text === "" || $.trim(text) === "") {
        //e.preventDefault();
        return false;
    }
    // destroy the existing chart
    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }

    $(".suggestions").remove();
    $("#paginated_cards").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    $(".dropDownMsg").remove();
    // if(text=="good bye"){
    //     text="/stop";
    // }
    // if(text=="see you soon"){
    //     text="/stop";
    // }
    // if(text=="bye bye"){
    //     text="/stop";
    // }
    // if(text=="get out"){
    //     text="/stop";
    // }
    // if(text=="get lost"){
    //     text="/stop";
    // }
    // if(text=="stop"){
    //     text="/stop";
    // }
    setUserResponse(text);
    send(text);
    // e.preventDefault();
    // document.getElementById('userInput').value= "abc"
    return false;
});
