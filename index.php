

<!DOCTYPE html>
<html lang="en">

<head>
    <title>IPN Academy | Meeting Room</title>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f8f9fa; /* Add a background color for better visibility */
        }

        .container {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a box shadow for 3D effect */
            background-color: white;
            width: 90%;
        }

        .logo {
            /* Add 3D effect styles to the logo */
            font-size: 24px;
            font-weight: bold;
            color: #3498db; /* Change the color as needed */
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
            margin-bottom: 20px;
        }
        .form-group-main{
            display: flex;
            flex-direction: column;
            align-items: left;
        }
        .form-group {
            margin-bottom: 15px;
         
        }
        .form-group input::placeholder{
            color: black;
         
        }
        .form-group input{
            color: black;
            
        }
        .form-group label{
            color: black;
            font-weight: bold;
           text-align: start;
        }

        .sdk-select {
            height: 34px;
            border-radius: 4px;
        }

        .websdktest button {
            margin-left: 5px;
        }

       
    </style>
</head>

<body>

    <div class="container">
        <div class="logo"><img src="https://ipnacademy.in/user/images/logo.png" width="120px" alt=""></div>
        <form class="form-group-main" id="meeting_form">
            <div class="form-group">
                <label>Your Name</label>
                <input type="text" aria-placeholder="Your Name" name="display_name" id="display_name" value="" maxLength="100"
                    placeholder="Name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Registered Email</label>
                <input type="text" required name="meeting_email" id="meeting_email" value=""
                    maxLength="32"  placeholder="Registered Email" class="form-control">
            </div>
            <div class="form-group">
                <label>Meeting Id</label>
                <input type="text" name="meeting_number" id="meeting_number" value="" maxLength="200"
            placeholder="Meeting Number" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Meeting Passcode</label>
                <input type="text" name="meeting_pwd" id="meeting_pwd" value="" 
                    maxLength="32" placeholder="Meeting Password" class="form-control">
            </div>
            <div class="form-group">
                <select hidden id="meeting_china" class="sdk-select">
                    <option selected value=0>Global</option>
                    <option value=1>China</option>
                </select>
            </div>
            <div class="form-group">
                <select hidden id="meeting_lang" class="sdk-select">
                    <option selected value="en-US">English</option>
                </select>
            </div>

            <input type="hidden" value="" id="copy_link_value" />
            <button type="submit" class="btn btn-primary" id="join_meeting">Join</button>
            <br/>
            <button type="submit" class="btn btn-primary" id="clear_all">Clear</button>
        </form>
    </div>

    <!-- Other scripts and links -->
    <script>
        document.getElementById('show-test-tool-btn').addEventListener("click", function (e) {
            var textContent = e.target.textContent;
            if (textContent === 'Show') {
                document.getElementById('nav-tool').style.display = 'block';
                document.getElementById('show-test-tool-btn').textContent = 'Hide';
            } else {
                document.getElementById('nav-tool').style.display = 'none';
                document.getElementById('show-test-tool-btn').textContent = 'Show';
            }
        })
    </script>
    <script src="https://source.zoom.us/3.1.6/lib/vendor/react.min.js"></script>
    <script src="https://source.zoom.us/3.1.6/lib/vendor/react-dom.min.js"></script>
    <script src="https://source.zoom.us/3.1.6/lib/vendor/redux.min.js"></script>
    <script src="https://source.zoom.us/3.1.6/lib/vendor/redux-thunk.min.js"></script>
    <script src="https://source.zoom.us/3.1.6/lib/vendor/lodash.min.js"></script>
    <script src="https://source.zoom.us/zoom-meeting-3.1.6.min.js"></script>
    <script src="js/tool.js"></script>
    <script src="js/vconsole.min.js"></script>
    <script src="js/index.js"></script>

</body>

</html>
