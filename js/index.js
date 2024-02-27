window.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  // if (testTool.isMobileDevice()) {
  //   vConsole = new VConsole();
  // }
  console.log("checkSystemRequirements");
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the MeetingSDK-Web dependency link resources. setZoomJSLib must be run at first
  // ZoomMtg.setZoomJSLib("https://source.zoom.us/{VERSION}/lib", "/av"); // default, don't need call it
  // ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/{VERSION}/lib", "/av"); // china cdn option
  ZoomMtg.preLoadWasm(); // pre download wasm file to save time.

  var CLIENT_ID = "TEPNadfBRaCUHUMHpuVqYQ";
  /**
   * NEVER PUT YOUR ACTUAL SDK SECRET OR CLIENT SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
   * The below generateSignature should be done server side as not to expose your SDK SECRET in public
   * You can find an example in here: https://developers.zoom.us/docs/meeting-sdk/auth/#signature
   */
  var CLIENT_SECRET = "S7KYTV2C3l6Bfb6zESWigrjrosNgpBYy";

  // some help code, remember mn, pwd, lang to cookie, and autofill.
  // document.getElementById("display_name").value =
  //   "CDN" +
  //   ZoomMtg.getWebSDKVersion()[0] +
  //   testTool.detectOS() +
  //   "#" +
  //   testTool.getBrowserInfo();
  document.getElementById("meeting_number").value =
    testTool.getCookie("meeting_number");
  document.getElementById("meeting_pwd").value =
    testTool.getCookie("meeting_pwd");
  if (testTool.getCookie("meeting_lang"))
    document.getElementById("meeting_lang").value =
      testTool.getCookie("meeting_lang");

  document
    .getElementById("meeting_lang")
    .addEventListener("change", function (e) {
      testTool.setCookie(
        "meeting_lang",
        document.getElementById("meeting_lang").value
      );
      testTool.setCookie(
        "_zm_lang",
        document.getElementById("meeting_lang").value
      );
    });
  // copy zoom invite link to mn, autofill mn and pwd.
  document
    .getElementById("meeting_number")
    .addEventListener("input", function (e) {
      var tmpMn = e.target.value.replace(/([^0-9])+/i, "");
      if (tmpMn.match(/([0-9]{9,11})/)) {
        tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
      }
      var tmpPwd = e.target.value.match(/pwd=([\d,\w]+)/);
      if (tmpPwd) {
        document.getElementById("meeting_pwd").value = tmpPwd[1];
        testTool.setCookie("meeting_pwd", tmpPwd[1]);
      }
      document.getElementById("meeting_number").value = tmpMn;
      testTool.setCookie(
        "meeting_number",
        document.getElementById("meeting_number").value
      );
    });

  document.getElementById("clear_all").addEventListener("click", function (e) {
    testTool.deleteAllCookies();
    document.getElementById("display_name").value = "";
    document.getElementById("meeting_number").value = "";
    document.getElementById("meeting_pwd").value = "";
    document.getElementById("meeting_lang").value = "en-US";
    window.location.href = "/index.html";
  });

  // click join meeting button
  document
    .getElementById("join_meeting")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var meetingConfig = testTool.getMeetingConfig();
        // Get meeting number and passcode from URL parameters
      var urlMeetingNumber = getURLParameter("mn");
      var urlPasscode = getURLParameter("pwd");

    // Set meeting number and passcode in meetingConfig
    meetingConfig.mn = urlMeetingNumber || meetingConfig.mn;
    meetingConfig.pwd = urlPasscode || meetingConfig.pwd;
      if (!meetingConfig.mn && !meetingConfig.name && !meetingConfig.email) {
        alert("Meeting number, username, and email are empty");
        return false;
    } else if (!meetingConfig.mn && !meetingConfig.name) {
        alert("Meeting number and username are empty");
        return false;
    } else if (!meetingConfig.mn && !meetingConfig.email) {
        alert("Meeting number and email are empty");
        return false;
    } else if (!meetingConfig.name && !meetingConfig.email) {
        alert("Username and email are empty");
        return false;
    } else if (!meetingConfig.mn) {
        alert("Meeting number is empty");
        return false;
    } else if (!meetingConfig.name) {
        alert("Username is empty");
        return false;
    } else if (!meetingConfig.email) {
        alert("Email is empty");
        return false;
    }
    

      testTool.setCookie("meeting_number", meetingConfig.mn);
      testTool.setCookie("meeting_pwd", meetingConfig.pwd);

      var signature = ZoomMtg.generateSDKSignature({
        meetingNumber: meetingConfig.mn,
        sdkKey: CLIENT_ID,
        sdkSecret: CLIENT_SECRET,
        role: 0,
        success: function (res) {
          console.log(res);
          meetingConfig.signature = res;
          meetingConfig.sdkKey = CLIENT_ID;
          var joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
          console.log(joinUrl);
          window.open(joinUrl, "_blank");
        },
      });
    });

  function copyToClipboard(elementId) {
    var aux = document.createElement("input");
    aux.setAttribute(
      "value",
      document.getElementById(elementId).getAttribute("link")
    );
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  // click copy jon link button
  window.copyJoinLink = function (element) {
    var meetingConfig = testTool.getMeetingConfig();
    if (!meetingConfig.mn || !meetingConfig.name) {
      alert("Meeting number or username is empty");
      return false;
    }
    var signature = ZoomMtg.generateSDKSignature({
      meetingNumber: meetingConfig.mn,
      sdkKey: CLIENT_ID,
      sdkSecret: CLIENT_SECRET,
      role: meetingConfig.role,
      success: function (res) {
        console.log(res.result);
        meetingConfig.signature = res.result;
        meetingConfig.sdkKey = CLIENT_ID;
        var joinUrl =
          testTool.getCurrentDomain() +
          "/meeting.html?" +
          testTool.serialize(meetingConfig);
        document
          .getElementById("copy_link_value")
          .setAttribute("link", joinUrl);
        copyToClipboard("copy_link_value");
      },
    });
  };
}
