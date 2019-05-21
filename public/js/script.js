
// $(function () {
//     var availableTags = [
//         "Amit", "Kunal", "Vignesh", "John", "Josephi", "Anurag",
//         "Gimo", "Sobo", "ColdFusion", "Erlang", "Fortran",
//         "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl",
//         "PHP", "Python", "Ruby", "Scala", "Scheme"
//     ];

//     $(".autocomplete").autocomplete({
//         source: availableTags
//     });
// });
// $('.li-modal').on('click', function (e) {
//     alert("ABN");
//     var x = document.getElementsByClassName(".li-modal")[0].id;
//     e.preventDefault();
//     $("#"+x).modal('show').find('.modal-content').load($(this).attr('data-href'));
// });
// $(".btn-lg").click(function(event){
//     event.preventDefault();// this will stop redirecting to other page
//     $(this).attr("href", "https://www.google.com");
// });
$('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
  });
$("#contractualLoad").on("change",function(e){
    debugger;
    var contractualLoad=$(this).val();
    var form=$('form[name="createFaculty"]');
    var classTypeId=$('#facultyTypeId').val();
    var defaultContractualLoad,fallLoad,springLoad,summer1Load,summer2Load;
    $.ajax({

        url: "/faculty/getContractualLoad/"+ classTypeId,
        method: 'get',
        success: function(results) {
            debugger;
            if(contractualLoad!=results.contractualLoad){
          
              $("#load-distribution").removeClass('hide')
              debugger;
            }
            else{
                $("#load-distribution").addClass('hide')
                debugger;
                $("#fallLoad").val(results.contractualLoadDistribution.fallLoad);
                $("#springLoad").val(results.contractualLoadDistribution.springLoad);
                $("#summer1Load").val(results.contractualLoadDistribution.summer1Load);
                $("#summer2Load").val(results.contractualLoadDistribution.summer2Load);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
           
        
    })
   
})

$(function() {
    $('.equal').matchHeight();
});
function userSearchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("userSearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("userListTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

jQuery(document).ready(function ($) {

    $("#schoolTypeId").change(function () {
        var schoolTypeId = $(this).val();
        debugger;
        $.ajax({

            url: "/signup/getDepartment/" + schoolTypeId,
            method: 'get',
            success: function (htmlOption) {
                $("#departmentTypeId").html(htmlOption);
            }
        })
    });
    $("#courseTypeId").change(function () {
        debugger;
        var courseTypeId = $(this).val();
        $.ajax({

            url: "/modals/getSection/" + courseTypeId,
            method: 'get',
            success: function (htmlOption) {
                debugger;
                $("#sectionTypeId").html(htmlOption);
            }
        })
    });
    $("#getSchedule").click(function () {
        event.preventDefault();
        try{
            var courseTypeId = $("#courseTypeId").val();
            var sectionTypeId=$("#sectionTypeId").val();
            debugger
            if(!courseTypeId||courseTypeId==""||courseTypeId=="select course")
                throw "Select Course to get Schedule"
            if(!sectionTypeId||sectionTypeId==""||sectionTypeId=="Choose")
                throw "Select Section to get Schedule"
            var courseScheduleId=courseTypeId+"-"+sectionTypeId;
            debugger;
            $.ajax({
                url: "/modals/getSchedule/"+courseScheduleId,
                method: 'get',
                success: function (htmlOption) {
                    $("#courseSchedule").html(htmlOption);
                    $(".courseSchedule-block").removeClass("hide");
                }
            })
        }
        catch(error){
                alert(error)
        }
    });
});

jQuery(document).ready(function ($) {
    $("#facultyTypeId").change(function () {
        var facultyTypeId = $(this).val();
        $.ajax({
            url: "/faculty/getContractualLoad/" + facultyTypeId,
            method: 'get',
            success: function (htmlOption) {
                $("#contractualLoad").val(htmlOption.contractualLoad);
                debugger;
                if(contractualLoad!=htmlOption.contractualLoad){
                    $("#load-distribution").addClass('hide')
                    $("#fallLoad").val(htmlOption.contractualLoadDistribution.fallLoad);
                    $("#springLoad").val(htmlOption.contractualLoadDistribution.springLoad);
                    $("#summer1Load").val(htmlOption.contractualLoadDistribution.summer1Load);
                    $("#summer2Load").val(htmlOption.contractualLoadDistribution.summer2Load);  
                  
                 
                  }
                  else{
                    $("#load-distribution").removeClass('hide')
                    $("#fallLoad").val(htmlOption.contractualLoadDistribution.fallLoad);
                    $("#springLoad").val(htmlOption.contractualLoadDistribution.springLoad);
                    $("#summer1Load").val(htmlOption.contractualLoadDistribution.summer1Load);
                    $("#summer2Load").val(htmlOption.contractualLoadDistribution.summer2Load);
                    
                  }
              
            }
        })
    });
});
$(document).on("click", ".rm-modal", function () {
    event.preventDefault();
    var partyId = $(this).data('id');
    debugger;
    var modalBodyElement = document.getElementsByClassName(".modal-body");
    modalBodyElement.id = partyId;
    debugger;

});
function removeUser() {
    debugger;
    event.preventDefault();
    try {
        debugger;
        var modalBodyElement = document.getElementsByClassName(".modal-body");
        var partyId = modalBodyElement.id

        let partyInfo = { partyId: partyId };
        debugger;
        if (partyInfo)
            $.ajax({
                type: "post",
                url: "/modals/removeUser",
                data: partyInfo,
                contentType: "application/x-www-form-urlencoded",
                success: function (responseData, textStatus, jqXHR) {
                    debugger;
                    $('.modal.in').modal('hide');
                    location.reload();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }


            });
    }
    catch (error) {
        alert(error);
    }
    return true;

};
function removeModal() {
    debugger;
    event.preventDefault();
    debugger;
    var removeInfo = $('#remove').serialize();
    var url = $('form[name="remove"]').attr('data-action');
    try {
        debugger;
        if (removeId)
      
            $.ajax({
                type: "post",
                url: url,
                data: removeInfo,
                contentType: "application/x-www-form-urlencoded",
                success: function (responseData, textStatus, jqXHR) {
                    $('.modal.in').modal('hide');
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }

            });
    }
    catch (error) {
        alert(error);
    }
    return true;

};
function removeAssignment() {
    var deleteInfo = $('#deleteAssignment').serialize();
    var assignmentType= $('#assignmentType').val();
    try {
        debugger;
        if (deleteInfo)
            $.ajax({
                type: "post",
                url: "/modals/remove/"+assignmentType,
                data: deleteInfo,
                contentType: "application/x-www-form-urlencoded",
                success: function (responseData, textStatus, jqXHR) {
                    $('.modal.in').modal('hide');
                    location.reload();
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }

            });
    }
    catch (error) {
        alert(error);
    }
    return true;

};
function getUserCreated() {
    event.preventDefault();
    var userInfo = $('#internalSignUpForm').serialize();
    $.ajax({
        type: "post",
        url: "/modals/createUser",
        data: userInfo,
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            $('.modal.in').modal('hide');
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })

};
function getISRCreated() {
    event.preventDefault();
    debugger;
    var userInfo = $('#newISRForm').serialize();
    $.ajax({
        type: "post",
        url: "/modals/createISR",
        data: userInfo,
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            debugger;
            if (responseData == "success") {
                debugger;
                $('.modal.in').modal('hide');
                location.reload();
            }
            else {
                debugger;
                $("#alert-failure").val("Error " + responseData);
                $(".modal-body").load();
                throw responseData;
                debugger;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            debugger;
            console.log(errorThrown);
        }
    })

};


$('form[name="updateUser"]').on('submit', function (e) {
    debugger;
    event.preventDefault();

    var url = $('form[name="updateUser"]').attr('data-action');
    var userInfo = $('form[name="updateUser"]').serialize();
    var status = false;
    debugger;
    $.ajax({
        type: "post",
        url: url,
        data: userInfo,
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {

            if (responseData == "success") {
                $('.modal.in').modal('hide');

                location.reload();
                status = true;
            }
            else {

                $("#alertMsg").html(responseData);
                $(".modal-body").load();

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);

        }
    })
    debugger;
    return status;
});

$('form[name="ajaxPostRequest"]').on('submit', function (e) {
    debugger;
    event.preventDefault();
    var data = $('form[name="ajaxPostRequest"]').serialize();
    var url = $('form[name="ajaxPostRequest"]').attr('data-action');
    debugger;
    try {
     
            $.ajax({
                type: "post",
                url: url,
                data: data,
                contentType: "application/x-www-form-urlencoded",
                success: function (responseData, textStatus, jqXHR) {
                    debugger;
                    $('.modal.in').modal('hide');
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }


            });
    }
    catch (error) {
        alert(error);
    }

})

function isValidLogin() {
    // alert("coming");
    // var userLoginId = document.forms["login-form"]["userLoginId"];
    // var password = document.forms["login-form"]["password"];
    // var data = {};
    // data.userLoginId =userLoginId.value;
    // data.password = password.value;

    // $.ajax({
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //     url: '/authenticationCheck',
    //     success: function (data) {
    //         console.log('success');
    //         console.log(JSON.stringify(data));
    //     }
    // });
    return true;
}
function isValidSignup() {


    var firstName = document.forms["signupForm"]["firstName"];
    var lastName = document.forms["signupForm"]["lastName"];
    var gender = document.forms["signupForm"]["gender"];
    var roleTypeId = document.forms["signupForm"]["roleTypeId"];
    var birthDate = document.forms["signupForm"]["birthDate"];
    var designationTypeId = document.forms["signupForm"]["designationTypeId"];
    var schoolTypeId = document.forms["signupForm"]["schoolTypeId"];
    var houseNumber = document.forms["signupForm"]["houseNumber"];
    var address1 = document.forms["signupForm"]["address1"];
    var address2 = document.forms["signupForm"]["address2"];
    var country = document.forms["signupForm"]["country"];
    var state = document.forms["signupForm"]["state"];
    var city = document.forms["signupForm"]["city"];
    var postalCode = document.forms["signupForm"]["postalCode"];
    var contactNumber = document.forms["signupForm"]["contactNumber"];
    var emailAddress = document.forms["signupForm"]["emailAddress"];
    var userLoginId = document.forms["signupForm"]["userLoginId"];
    var password = document.forms["signupForm"]["password"];
    var confirmPassword = document.forms["signupForm"]["confirmPassword"];
    var phoneno = /^\d{10}$/;

    if (firstName.value == "") {
        window.alert("Please enter first name.");
        firstName.focus();
        return false;
    }
    if (lastName.value == "") {
        window.alert("Please enter last name.");
        lastName.focus();
        return false;
    }
    if (gender.selectedIndex < 1) {
        alert("Please select gender.");
        gender.focus();
        return false;
    }
    if (roleTypeId.selectedIndex < 1) {
        alert("Please select roleTypeId.");
        roleTypeId.focus();
        return false;
    }
    if (designationTypeId.selectedIndex < 1) {
        alert("Please select designationTypeId.");
        designationTypeId.focus();
        return false;
    }
    if (schoolTypeId.selectedIndex < 1) {
        alert("Please select schoolTypeId.");
        schoolTypeId.focus();
        return false;
    }
    if (departmentTypeId.selectedIndex < 1) {
        alert("Please select departmentTypeId.");
        departmentTypeId.focus();
        return false;
    }
    if (country.selectedIndex < 1) {
        alert("Please select country.");
        country.focus();
        return false;
    }
    if (state.selectedIndex < 1) {
        alert("Please select state.");
        state.focus();
        return false;
    }
    if (city.selectedIndex < 1) {
        alert("Please select city.");
        city.focus();
        return false;
    }
    if (contactNumber.value == "") {
        window.alert("Please enter Phone number.");
        contactNumber.focus();
        return false;
    }
    if (houseNumber.value == "") {
        window.alert("Please enter House number.");
        houseNumber.focus();
        return false;
    }
    if (!(contactNumber.value.match(phoneno))) {
        window.alert("Please enter valid Phone number.");
        contactNumber.focus();
        return false;

    }

    if (address1.value == "") {
        window.alert("Please enter your address1.");
        address1.focus();
        return false;
    }
    if (postalCode.value == "") {
        window.alert("Please enter  ZipCode.");
        postalCode.focus();
        return false;
    }


    if (emailAddress.value == "") {
        window.alert("Please enter a valid e-mail address.");
        emailAddress.focus();
        return false;
    }
    if (userLoginId.value == "") {
        window.alert("Please enter a userLoginId .");
        userLoginId.focus();
        return false;
    }
    if (confirmPassword.value == "") {
        window.alert("Please  confirm the Password .");
        confirmPassword.focus();
        return false;
    }
    if (confirmPassword.value != password.value) {
        window.alert("Password doesn't match");
        confirmPassword.focus();
        return false;
    }

    if (emailAddress.value.indexOf("@", 0) < 0) {
        window.alert("Please enter a valid e-mail address.");
        emailAddress.focus();
        return false;
    }

    if (emailAddress.value.indexOf(".", 0) < 0) {
        window.alert("Please enter a valid e-mail address.");
        emailAddress.focus();
        return false;
    }

    if (password.value == "") {
        window.alert("Please enter your password");
        password.focus();
        return flase;
    }

    var formName = document.getElementsByName("signupForm");
    if (formName[0].id == "internalSignUpForm") {
        getUserCreated();
    }

    return true;

};

// $(document).ready(function () {
//     $('.nav li a').click(function(e) {

//         $('.nav li.active').removeClass('active');

//         var $parent = $(this).parent();
//         $parent.addClass('active');
//         e.preventDefault();
//     });
// });

// function getTAAttributes() {
//     debugger;

//     var _idTA = $('#courseTypeIdforTA').val();
    
//     debugger;
//     $.ajax({
//         type: "get",
//         url: "/modals/getAttributesForTA/" + _idTA,
//         contentType: "application/x-www-form-urlencoded",
//         success: function (responseData, textStatus, jqXHR) {

//             $("#editResultTA").html((responseData));

//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(errorThrown);

//         }
//     })

// }

$('form[name="isr-user-search-form"]').on('submit', function (e) {
    debugger;

    event.preventDefault();

    var partyId = $('#partyId').val();
    var status = false;

    debugger;
    $.ajax({
        type: "get",
        url: "ISR/user/view/" + partyId,
        async: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {

            $("#searchResult").html((responseData));

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);

        }
    })
    debugger;
    return status;
});
$('#instructorPartyId').on("change",function (e) {
    debugger;
    var partyId=$('#instructorPartyId').val();
    $.ajax({
                type: "get",
                url: "/modals/getUserDetails/" + partyId,
                contentType: "application/x-www-form-urlencoded",
                success: function (responseData, textStatus, jqXHR) {
                    $("#departmentTypeId").val(responseData.departmentTypeId);
                    $("#designationTypeId").val(responseData.designationTypeId);
                    $("#facultyTypeId").val(responseData.facultyTypeId);
                    $("#contractualLoad").val(responseData.contractualLoad);
                    debugger;
                    if(responseData.visibility){
                        $("#load-distribution").removeClass("hide");
                        $("#fallLoad").val(responseData.fallLoad);
                        $("#springLoad").val(responseData.springLoad);
                        $("#summer1Load").val(responseData.summer1Load);
                        $("#summer2Load").val(responseData.summer2Load);
                    }
                       
                    else{
                        $("#load-distribution").removeClass("hide");
                        $("#load-distribution").addClass("hide");
                        $("#fallLoad").val(responseData.fallLoad);
                        $("#springLoad").val(responseData.springLoad);
                        $("#summer1Load").val(responseData.summer1Load);
                        $("#summer2Load").val(responseData.summer2Load);
                    }
                      
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
        
                }
            })
})
$('#enrollement').on("change",function (e) {
    debugger;
    var ssh = parseInt($('#enrollement').val()) * parseInt($('#semHours').val());
    $('#ssh').val(ssh);
})
$('#semHours').change(function () {
    var ssh = parseInt($('#enrollement').val()) * parseInt($('#semHours').val());
    $('#ssh').val(ssh);
})
$('#assignedTCHSummer').change(function () {
    var total = parseInt($('#assignedTCHSummer').val()) + parseInt($('#assignedTCHSpring').val()) + parseInt($('#assignedTCHFall').val()) + parseInt($('#assignedTCHY').val());
    $('#totalTCH').val(total);
})
$('#assignedTCHSpring').change(function () {
    var total = parseInt($('#assignedTCHSummer').val()) + parseInt($('#assignedTCHSpring').val()) + parseInt($('#assignedTCHFall').val()) + parseInt($('#assignedTCHY').val());
    $('#totalTCH').val(total);
})
$('#assignedTCHFall').change(function () {
    var total = parseInt($('#assignedTCHSummer').val()) + parseInt($('#assignedTCHSpring').val()) + parseInt($('#assignedTCHFall').val()) + parseInt($('#assignedTCHY').val());
    $('#totalTCH').val(total);
})
$('#assignedTCHY').change(function () {
    var total = parseInt($('#assignedTCHSummer').val()) + parseInt($('#assignedTCHSpring').val()) + parseInt($('#assignedTCHFall').val()) + parseInt($('#assignedTCHY').val());
    $('#totalTCH').val(total);
})

$('form[name="assignmentAjaxForm"]').on('submit', function (e) {
    event.preventDefault();
    var url = $('form[name="assignmentAjaxForm"]').attr('data-action');
    var info = $('form[name="assignmentAjaxForm"]').serialize();
    $.ajax({
        type: "post",
        url: url,
        data: info,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            if (responseData == "success") {
                $('.modal.in').modal('hide');
                location.reload();
            }
            else {
                $("#alertMsg").html(responseData);
                $(".modal-body").load();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
});
$('form[name="editAssignmentAjaxForm"]').on('submit', function (e) {
    event.preventDefault();
    var url = $('form[name="editAssignmentAjaxForm"]').attr('data-action');
    var info = $('form[name="editAssignmentAjaxForm"]').serialize();
    $.ajax({
        type: "post",
        url: url,
        data: info,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            if (responseData == "success") {
                $('.modal.in').modal('hide');
                location.reload();
            }
            else {
                $("#alertMsg").html(responseData);
                $(".modal-body").load();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
});
$('form[name="facultyAjaxForm"]').on('submit', function (e) {
    event.preventDefault();
    var url = $('form[name="facultyAjaxForm"]').attr('data-action');
    var info = $('form[name="facultyAjaxForm"]').serialize();
    $.ajax({
        type: "post",
        url: url,
        data: info,
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            if (responseData == "success") {
                $('.modal.in').modal('hide');
                location.reload();
            }
            else {
                $("#alertMsg").html(responseData);
                $(".modal-body").load();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
});