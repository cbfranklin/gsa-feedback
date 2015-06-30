// GSA FEEDBACK PLUGIN
//==============================
//	Created by Ogilvy NY
//	For US General Services Administration
//	2013

(function($) {

    jQuery.fn.gsaFeedback = function(settings) {
        var config = {
            'tabText': 'Rate this Page',
            'headerText': 'Was this page helpful?',
            'queryText': '', //optional
            'queryType': 'yesNo', //or 'oneFive'
            'oneText': 'Not at all helpful', //for 1-5 rating only
            'fiveText': 'Very helpful', //for 1-5 rating only
            'commentText': 'How can this page be improved? (optional)',
            'thankYouText': 'Thank you!',
            'formAction': 'https://docs.google.com/a/ogilvy.com/forms/d/1B_L480fVCUr1LtuR0EOjuBlOOzPxH8gLlHHr4zNGFuw/formResponse'
        };

        if (settings) {
            $.extend(config, settings);
        }

        return this.each(function() {

            //Markup
            var formHTML = "<div id='gsaFeedback' class='bootstrap'> <div id='gsaFeedbackTab' class='tab'> <a id='tabText' href='#'></a> </div> <div class='body'> <h3 id='headerText'></h3> <p id='queryText'></p> <div class='query'> </div> <br> <div><p id='commentText'></p></div> <div> <textarea></textarea> </div> <br> <div> <button id='submit' class='btn btn-large disabled'>Submit</button> </div> <div class='load'>Sending...</div> </div> <form method='POST' target='form-target' onsubmit="
            "> <iframe id='form-target' name='form-target' style='width:0px; height:0px; border:0px;'></iframe> <label id='rating' for='entry.10480988'></label> <input type='text' name='entry.10480988' value='' class='rating' id='entry_10480988' dir='auto'> <label id='comments' for='entry.1335745066'></label> <input type='text' name='entry.1335745066' value='' class='comments' id='entry_1335745066' dir='auto'> <input type='hidden' name='entry.1324274909' value='' class='pageTitle' id='entry_1324274909' dir='auto'> <input type='hidden' name='entry.2114216902' value='' class='pageURL' id='entry_2114216902' dir='auto'> <input type='hidden' name='draftResponse' value='[]'> <input type='hidden' name='pageHistory' value='0'> <input type='submit' name='submit' value='Submit'> </form></div>";

            var oneFiveHTML = '<span id="oneText"></span> <div class="btn-group btn-toggle" data-toggle="buttons"> <button class="btn">1</button> <button class="btn">2</button> <button class="btn">3</button> <button class="btn">4</button> <button class="btn">5</button> </div> <span id="fiveText"></span>';

            var yesNoHTML = '<div class="btn-group btn-toggle" data-toggle="buttons-radio"> <button class="btn">Yes</button> <button class="btn">No</button> </div>';


            //CONFIG
            $('body').append(formHTML);

            $('#gsaFeedback #tabText').text(config.tabText);
            $('#gsaFeedback #headerText').text(config.headerText);
            $('#gsaFeedback #queryText').text(config.queryText);
            $('#gsaFeedback #commentText').text(config.commentText);

            if (config.queryType === 'oneFive') {
                $('#gsaFeedback .query').attr('id', 'oneFive').prepend(oneFiveHTML);
                $('#gsaFeedback #oneText').text(config.oneText);
                $('#gsaFeedback #fiveText').text(config.fiveText);
            } else {
                $('#gsaFeedback .query').attr('id', 'yesNo').prepend(yesNoHTML);
            }

            $("#gsaFeedback form").attr("onsubmit", "this.action=\'" + config.formAction + "\';");
            $("#gsaFeedback form").attr("action", config.formAction);

            //508
            $('#skip-to-content-destination').append('<a id="gsaFeedbackSkip" href="#gsaFeedbackTab" class="skip-content"></a>');
            $('#gsaFeedbackSkip').text(config.tabText)
            $('#gsaFeedback form #rating').text(headerText);
            $('#gsaFeedback form #comments').text(commentText);

            //ONE TOGGLED BUTTON ONLY
            $('.btn-toggle button').on('click', function() {
                $(this).siblings().removeClass('active');
            });

            //RUN
            $('#gsaFeedback .tab a').click(function() {
                $('#gsaFeedback .body').slideToggle(150);
                return false;
            });
            $('.query .btn').click(function() {

                $('#gsaFeedback #submit').removeClass('disabled');

                $('#gsaFeedback #submit').click(function() {
                    $('#gsaFeedback .load').show();
                    //rating
                    var rating = $('#gsaFeedback .query .active').text();
                    $('#gsaFeedback form .rating').attr('value', rating);
                    //comments
                    var comments = $('#gsaFeedback textarea').val();
                    $('#gsaFeedback form .comments').attr('value', comments);
                    //pageURL
                    $('#gsaFeedback form .pageURL').attr('value', window.location.href);
                    //pageTitle
                    $('#gsaFeedback form .pageTitle').attr('value', document.title);

                    $('#gsaFeedback form input[type=submit]').click();
                    $('#gsaFeedback .load').delay(650).fadeOut();
                    $('#gsaFeedback .body').delay(1000).slideToggle();
                    $('#gsaFeedback .tab').unbind().text(config.thankYouText)
                        .parent('#gsaFeedback').delay(3000).fadeOut();
                });
            });
        });

    };

})(jQuery);
