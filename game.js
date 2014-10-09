var imageDirArr = ['image1', 'image1'];
var gameLevel = 'easy', correctImageSeries, noOfBoxes, rowLen, imgDirName = 'image1';

var assoc_td_1, assoc_td_2, assoc_td_3, assoc_td_4, assoc_td_5, assoc_td_6,
        assoc_td_7, assoc_td_8, assoc_td_9, assoc_td_10, assoc_td_11,
        assoc_td_12, assoc_td_13, assoc_td_14, assoc_td_15, assoc_td_16;

// this will only be called if game level changed
var setNoOfBoxes = function() {
    switch (gameLevel) {
        case 'easy':
            noOfBoxes = 9;
            rowLen = 3;
            break;
        case 'moderate':
            noOfBoxes = 16;
            rowLen = 4;
            break;
    }
}
// this will only be called if game level changed
var createAssocTdList = function() {
    switch (gameLevel) {
        case 'easy':
            correctImageSeries = 'img_1-img_2-img_3-img_4-img_5-img_6-img_7-img_8-undefined-';

            // create array of all associated td
            assoc_td_1 = ["td_2", "td_4"];
            assoc_td_2 = ["td_1", "td_3", "td_5"];
            assoc_td_3 = ["td_2", "td_6"];
            assoc_td_4 = ["td_1", "td_5", "td_7"];
            assoc_td_5 = ["td_2", "td_4", "td_6", "td_8"];
            assoc_td_6 = ["td_3", "td_5", "td_9"];
            assoc_td_7 = ["td_4", "td_8"];
            assoc_td_8 = ["td_7", "td_5", "td_9"];
            assoc_td_9 = ["td_6", "td_8"];
            break;
        case 'moderate':
            correctImageSeries = 'img_1-img_2-img_3-img_4-img_5-img_6-img_7-img_8-img_9-img_10-img_11-img_12-img_13-img_14-img_15-undefined-';

            // create array of all associated td
            assoc_td_1 = ["td_2", "td_5"];
            assoc_td_2 = ["td_1", "td_3", "td_6"];
            assoc_td_3 = ["td_2", "td_4", "td_7"];
            assoc_td_4 = ["td_3", "td_8"];
            assoc_td_5 = ["td_1", "td_6", "td_9"];
            assoc_td_6 = ["td_2", "td_5", "td_7", "td_10"];
            assoc_td_7 = ["td_3", "td_6", "td_8", "td_11"];
            assoc_td_8 = ["td_4", "td_7", "td_12"];
            assoc_td_9 = ["td_5", "td_10", "td_13"];
            assoc_td_10 = ["td_6", "td_9", "td_11", "td_14"];
            assoc_td_11 = ["td_7", "td_10", "td_12", "td_15"];
            assoc_td_12 = ["td_8", "td_11", "td_16"];
            assoc_td_13 = ["td_9", "td_14"];
            assoc_td_14 = ["td_10", "td_13", "td_15"];
            assoc_td_15 = ["td_11", "td_14", "td_16"];
            assoc_td_16 = ["td_12", "td_15"];

            break;
    }
}
var getBlankTdId = function() {
    var blankTdId = $('.blank').attr('id');
    return blankTdId;
}
var checkComplition = function() { //check all image position if completed
    var currentSeries = '';
    $('#gameTable tr td').each(function() {
        currentSeries += $(this).find("img").attr('id') + '-';
    });

    if (currentSeries == correctImageSeries) {
        $("#td_" + noOfBoxes).html('<img id="img_' + noOfBoxes + '" src="media/' + imgDirName + '/' + noOfBoxes + '/img' + noOfBoxes + '.jpeg" />');
        $("#" + getBlankTdId()).removeClass('blank');
        stopTimer();
        $("#opMsg").show();
    }
}
var bindGame = function() {
    $("td").click(function(data) {
        var currentTdId = $(data.currentTarget).attr('id');
        var blankTdId = getBlankTdId();

        if (-1 < $.inArray(blankTdId, eval("assoc_" + currentTdId))) {
            // move image
            $("#" + blankTdId).html($("#" + currentTdId).html());
            $("#" + currentTdId).html('');
            $("#" + blankTdId).removeClass('blank');
            $("#" + currentTdId).addClass('blank');
            checkComplition();
        }
    });
    startTimer();
}
var arrange = function() {
    var tableContent = '', boxCount = 0;

    for (var i = 1; i <= rowLen; i++) {
        tableContent += '<tr>';
        for (var j = 1; j <= rowLen; j++) {
            boxCount++;

            if (boxCount == noOfBoxes) {
                tableContent += '<td id="td_' + boxCount + '" class="blank"></td>';
            } else {
                tableContent += '<td id="td_' + boxCount + '"> <img id="img_' + boxCount + '" src="media/' + imgDirName + '/' + noOfBoxes + '/img' + boxCount + '.jpeg" /></td>';
            }
        }
        tableContent += '</tr>';
    }
    $("#gameTable").html(tableContent);
}

var randomize = function() {
    $("#opMsg").hide();
    var blankTdId, randImageNo, assocArr;
    for (var i = 0; i < 50; i++) { // random move 50 times
        setTimeout(function() {
            blankTdId = getBlankTdId();
            assocArr = eval("assoc_" + blankTdId);
            randImageNo = assocArr[Math.floor(Math.random() * assocArr.length)];
            $("#" + blankTdId).html($("#" + randImageNo).html()).removeClass('blank');
            $("#" + randImageNo).html('').addClass('blank');
//console.log(blankTdId);
        }, (i * 50));
    }
    bindGame();
    $("#start-button").hide();
}
var changeImage = function() {
    if (confirm("Are you sure? You will loose the current progress.")) {
        resetTimer();
        $("#select_image_div").show();
        $("#game-on").hide();
    }
}
var selectImage = function(dirName) {
    $("#opMsg").hide();
    imgDirName = dirName;
    $("#orig-img").attr('src', 'media/' + imgDirName + '/orig.jpeg');
    arrange();
    $("#select_image_div").hide();
    $("#game-on").show();
    $("#start-button").show();
}
var changeLevel = function(level, elem) {
    if (confirm("Are you sure? You will loose the current progress.")) {
        resetTimer();
        $(".change-game button").show();
        $(elem).hide();

        $("#opMsg").hide();
        gameLevel = level;
        $("#show-current-level").html(gameLevel);
        setNoOfBoxes();
        createAssocTdList();
        arrange();
        $("#start-button").show();
    }
}

$(document).ready(function() {
    $("#btn-easy").hide();
    $("#show-current-level").html(gameLevel);
    setNoOfBoxes();
    createAssocTdList();
});