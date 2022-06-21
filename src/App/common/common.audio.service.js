AUDIO_TESTER = null;
agmNgModuleWrapper('agm.common')
    .defineService('commonAudioService', [], function(serviceObj, dep, tool) {
        // .wav files are not supported in IE
        $(document).ready(function() {

            serviceObj.playTradeFeedAudio = generateAudioPlayer("feed", "//am708403.azureedge.net/sounds/trading/feed.mp3");
            serviceObj.playAlgoFeedAudio = generateAudioPlayer("tweet", "//am708403.azureedge.net/sounds/trading/tweet.mp3");
            serviceObj.playOtherPostsAudio = generateAudioPlayer("bubble", "//am708403.azureedge.net/sounds/trading/bubblePop6.mp3");
            AUDIO_TESTER = serviceObj;
        });

        function generateAudioPlayer(name, url) {

            var audioElement = $("<audio></audio>");
            audioElement.attr("name", "AUDIO_" + name);
            audioElement.attr("src", url);
            $("body").add(audioElement);
            return function() {
                try {
                    audioElement.ready(function() {
                        audioElement[0].play();
                    });
                } catch (err) {
                    tool.log("ALERT ON " + name + " AUDIO IS NOT SUPPORTED");
                }
            }

        }
    });