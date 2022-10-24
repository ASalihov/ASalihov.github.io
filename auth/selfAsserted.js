$(function () {
    // https://github.com/stevenxzhou-zz/B2C-Samples/blob/master/Email-Verification-Automatic-Redirect.js
    const applyB2CAddOns = function () {
		console.log("!!! 10 !!!");
        const verifyCodeBtn = document.querySelector('.verifyCode');
        const sendCodeBtn = document.querySelector('.sendCode');
        const changeEmailBtn = document.querySelector('.changeClaims');
        const cancelBtn = document.querySelector('#cancel');
        const continueBtn = document.querySelector('#continue');

        // Make sure always remove the continue button if it exists and send verification code button displayed.
        if (sendCodeBtn && continueBtn) {
            continueBtn.style.display = 'none';
        }

        $element.confirm = function () {
            return $i2e.redirectToServer('confirmed');
        };

        // Overriding following two methods so that we can detect the failure calling these two methods.
        $element.onError = function (code, message, isSendingQuietly) {
            if (isSendingQuietly) {
                $diags.sendQuietDiagnostics(code, message);
            } else {
                $diags.sendDiagnostics(code, message);
            }
            return false;
        };

        // Sets error message and shows it to the user.
        $element.setAndShowErrorMessage = function (id, msg) {
            const $id = $('#' + id);

            if (msg) {
                $id.text(msg);
            }

            // Add the aria attributes and tabindex allowing the message to receive focus
            $id.attr({ role: 'alert', 'aria-live': 'polite', 'aria-hidden': 'false', tabindex: '1' }).css('display', 'block');

            failedToRedirect = true;
        };

        if (verifyCodeBtn) {
            // Adding auto submission once found it is a email verification page.
            verifyCodeBtn.onclick = function () {
                continueBtn.style.display = 'none';

                // Continue the page once email is validated.
                const verifyInterval = setInterval(function () {
                    if ($element.verificationInfo.emailVerificationControl) {
                        clearInterval(verifyInterval);
                        $element.verify();
                        cancelBtn.style.display = 'none';
                        changeEmailBtn.style.display = 'none';
                    }
                }, 50);
            };
        }
    };

    (function onPageReady() {
        const intervalHandle = setInterval(function () {
            if (window.pageReady) {
                applyB2CAddOns();
                clearInterval(intervalHandle);
            }
        }, 50);
    })();
});
