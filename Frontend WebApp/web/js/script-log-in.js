/* 
 * Tugas 3 IF3110 Pengembangan Aplikasi Web
 * Website StackExchangeWS Sederhana
 * dengan tambahan web security dan frontend framework
 * 
 * @author Irene Wiliudarsan - 13513002
 * @author Angela Lynn - 13513032
 * @author Devina Ekawati - 13513088
 */

$(document).ready(function(){
  // LOG IN FORM
  // Menghentikan submit request
  $("#log-in-form").submit(function(e) {
    e.preventDefault(); 
  });
  
  // Memeriksa tombol submit di log in page di klik
  $("#log-in-submit").click(function(e){
    // Ambil form data secara serializable
    dataString = $("#log-in-form").serialize();

    // Ambil form data
    var email = $("#log-in-email").val();
    dataString = "email=" + email;
    var password = $("#log-in-password").val();
    dataString += "&password=" + password;

    // Buat AJAX request
    $.ajax({
      type: "POST",
      url: "http://localhost:8082/Identity_Service/LogInController",
      data: {email: email, 
            password: password},
      dataType: "json",
      // Hasil terima response dari server
      success: function(data, textStatus, jqXHR) {
       window.location.href = "http://localhost:8080/Frontend_WebApp/IndexController?token=" + data.access_token;
       alert("You have log in.");
      },
      // Tidak ada response dari server
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Something really bad happened " + textStatus + ". Please reload this page");
      },
      beforeSend: function(jqXHR, settings) {
        $("#log-in-submit").attr("disabled", true);
      },
      complete: function(jqXHR, textStatus) {
        $("#log-in-submit").attr("disabled", false);
      }
    });
  });
});

