(function() {
    formSuccess = false;

    createButtons();
    'use strict';
    var validate = {
        isEmpty: function(value) {
            if ((!value.length) || (value === undefined) || (value === null) || (/^\s+$/.test(value)))
                return false;
            return true;
        },
        isNIF: function(value) {
            var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
            var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
            var str = value.toString().toUpperCase();

            if (!nifRexp.test(str))
                return false;
            return true;
        },
        isDate: function(date) {
            var expDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            return (expDate.test(date));
        },
        isCorrectPassword: function(value) {
            var keyAccess = 98765;
            if (!value)
                return false;
            if (value.length <= 4)
                return false;
            if (value != keyAccess)
                return false;
            return true;
        },
        isChecked: function() {
            var group1 = document.formValidate.group1;
            for (var i = 0; i < group1.length; i++) {
                if (group1[i].checked)
                    return true;
            }
        },
        isSelected: function() {
            var selDep = document.formValidate.selDep.value;
            if (!selDep) {
                return false;
            }
        }
    }

    //btn
    var btnClean = document.getElementById('aClean');

    btnClean.addEventListener(
        'click',
        function() {
            access.value = "";
        }
    )


    //messages.
    var msgNif = document.getElementById('msgNif'),
        msgDate = document.getElementById('msgDate'),
        msgAccess = document.getElementById('msgAccess'),
        msgDep = document.getElementById('msgDep'),
        msgSelDep = document.getElementById('msgSelDep');


    var formValidate = document.getElementById('btnSubmit'),
        nif = document.getElementById('txtNif'),
        date = document.getElementById('txtDate'),
        access = document.getElementById('txtAccess'),
        seldep = document.getElementById('seldep');


    var validateNIF = function(e) {
        if (!validate.isEmpty(nif.value)) {
            msgNif.innerHTML = '<i class="material-icons left">error</i>Este campo es obligatorio.';
            msgNif.style.color = "#DF0101";
            formSuccess = false;
            e.preventDefault();
        } else if (!validate.isNIF(nif.value)) {
            msgNif.innerHTML = '<i class="material-icons left">error</i>NIF incorrecto.';
            msgNif.style.color = "#DF0101";
            formSuccess = false;
            e.preventDefault();
        } else {
            msgNif.innerHTML = '<i class="material-icons left">done</i>';
            msgNif.style.color = "#3ADF00";
            formSuccess = true;
        }
    }

    var validateDate = function(e) {
        if (!validate.isEmpty(date.value)) {
            msgDate.innerHTML = '<i class="material-icons left">error</i>Este campo es obligatorio.';
            msgDate.style.color = "#DF0101";
            formSuccess = false;
            e.preventDefault();
        } else if (!validate.isDate(date.value)) {
            msgDate.innerHTML = '<i class="material-icons left">error</i>La fecha es incorrecta.';
            msgDate.style.color = "#DF0101";
            formSuccess = false;
            e.preventDefault();
        } else {
            msgDate.innerHTML = '<i class="material-icons left">done</i>';
            msgDate.style.color = "#3ADF00";
            formSuccess = true;
        }
    }

    var validateKeyAccess = function(e) {
        if (!validate.isEmpty(access.value)) {
            msgAccess.innerHTML = '<i class="material-icons left">error</i>Este campo es obligatorio.';
            msgAccess.style.color = "#DF0101";
            formSuccess = false;
        } else if (!validate.isCorrectPassword(access.value)) {
            msgAccess.innerHTML = '<i class="material-icons left">error</i>La clave es errónea.';
            msgAccess.style.color = "#DF0101";
            formSuccess = false;
        } else {
            msgAccess.innerHTML = '<i class="material-icons left">done</i>';
            msgAccess.style.color = "#3ADF00";
            formSuccess = true;
        }
    }

    var validateChecked = function() {
        if (!validate.isChecked()) {
            msgDep.innerHTML = '<i class="material-icons left">error</i>Este campo es obligatorio.';
            msgDep.style.color = "#DF0101";
            formSuccess = false;
        } else {
            msgDep.innerHTML = '';
            formSuccess = true;
        }
    }

    /*  var validateSelected = function() {
        if (!validate.isSelected()) {
            msgSelDep.innerHTML = '<i class="material-icons left">error</i>No puedes dejar este campo en blanco.';
            msgDep.style.color = "#DF0101";
        } else {
            msgSelDep.innerHTML = '';
        }
    }

*/
    var successForm = function() {
        if (formSuccess == true) {
            var divSuccess = document.getElementById('divSuccess');
            divSuccess.style.display = 'block';
        }
    }

    var validateForm = function(e) {
        validateNIF(e);
        validateDate(e);
        validateKeyAccess(e);
        validateChecked();
        successForm();
    }

    formValidate.addEventListener(
        'click',
        validateForm
    )


    $(document).ready(function() {
        $('select').material_select();
    });

}());

function createButtons() {
    var btns = 10;
    var divBtns = document.getElementById('btns');
    var txtAccess = document.getElementById('txtAccess');
    var rndNums = [];
    if (divBtns.children.length > 0) {
        for (var i = divBtns.children.length; i > 0; i--) {
            divBtns.removeChild(divBtns.children[i - 1]);
        }
    }

    for (var i = 0; i < btns; i++) {
        do {
            var rnd = Math.floor(Math.random(i) * btns);
        } while (rndNums[rnd]);
        rndNums[rnd] = true;
        var btn = document.createElement('button');
        btn.setAttribute('id', 'btnNum');
        btn.setAttribute('class', 'btn waves-effect waves-light');
        btn.setAttribute('value', rnd)
        var btnContenido = document.createTextNode(rnd);
        btn.appendChild(btnContenido);
        divBtns.appendChild(btn);
        if (i == 4) {
            divBtns.innerHTML += "<br />";
        }

    }

    divBtns.addEventListener('click', function(event) {
        if (event.target.tagName === "BUTTON")
            txtAccess.value += event.target.value;
    });
}

function genSelected(value) {
    var divPhoto = document.getElementById('divPhoto');
    if (value == "masculino") {
        divPhoto.innerHTML = "<img src='img/b.png'>";
    } else {
        divPhoto.innerHTML = "<img src='img/a.png'>";
    }
}

function showSelected() {
    var showD = document.getElementById('showD'),
        showF = document.getElementById('showF');
    if (document.formValidate.group1[0].checked == true) {
        showD.style.display = 'block';
        showF.style.display = 'none';
    } else {
        showF.style.display = 'block';
        showD.style.display = 'none';
    }
}

function resetForm() {
    createButtons();
    msgDate.innerHTML = "";
    msgAccess.innerHTML = "";
    msgNif.innerHTML = "";
    msgDep.innerHTML = "";
    divPhoto.innerHTML = "";
    divSuccess.style.display = 'none';
}
