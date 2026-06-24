// 1. Toggles the Dropdown Navigation Menu open/closed when ☰ is clicked
function showMenu() {
    var menu = document.getElementById("myMenu");
    if (!menu) return;
    
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// 2. Registration Page Submission Handler
function saveUserAndProceed(event) {
    event.preventDefault(); 
    var nameField = document.getElementById("fullName");
    var phoneField = document.getElementById("phoneNumber");
    
    if (nameField && phoneField) {
        sessionStorage.setItem("currentUserName", nameField.value);
        sessionStorage.setItem("currentUserPhone", phoneField.value);
        window.location.href = "share.html"; 
    }
}

// 3. Selection Page Database Handler 
function submitGift(event) {
    event.preventDefault(); 
    var selectedGift = document.querySelector('input[name="gift"]:checked');
    if (!selectedGift) {
        alert("Please select a gift before submitting!");
        return;
    }
    
    var name = sessionStorage.getItem("currentUserName") || "Anonymous";
    var phone = sessionStorage.getItem("currentUserPhone") || "No Phone Provided";
    
    var claimRecord = {
        fullName: name,
        phoneNumber: phone,
        giftSelected: selectedGift.value,
        dateClaimed: new Date().toLocaleString()
    };
    
    var database = JSON.parse(localStorage.getItem("giftClaimsDatabase")) || [];
    database.push(claimRecord);
    localStorage.setItem("giftClaimsDatabase", JSON.stringify(database));
    
    var formEl = document.getElementById("giftForm");
    var msgEl = document.getElementById("claimMessage");
    var txtEl = document.getElementById("successText");
    
    if (formEl) formEl.style.display = "none";
    if (txtEl) txtEl.innerText = "Congratulations " + name + "! You have selected: " + selectedGift.value;
    if (msgEl) msgEl.style.display = "block";
}

// 4. Force System Return to Homepage Root Link
function goHome() {
    window.location.href = "index.html";
}
