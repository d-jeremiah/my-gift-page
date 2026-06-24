// ==========================================
// 1. NAVIGATION DRAWER MENU TOGGLE
// ==========================================
function showMenu() {
    var menu = document.getElementById("myMenu");
    if (!menu) return;
    
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// ==========================================
// 2. REGISTRATION PAGE DATA HANDLER
// ==========================================
function saveUserAndProceed(event) {
    event.preventDefault(); // Prevents the webpage from reloading on submit
    
    // Grab input values typed by the user
    var nameField = document.getElementById("fullName");
    var phoneField = document.getElementById("phoneNumber");
    
    if (nameField && phoneField) {
        // Temporarily stash these details into browser memory session
        sessionStorage.setItem("currentUserName", nameField.value);
        sessionStorage.setItem("currentUserPhone", phoneField.value);
        
        // Direct them straight to the gift selection layout page
        window.location.href = "share.html";
    }
}

// ==========================================
// 3. SELECTION PAGE & DATABASE STORAGE LOGIC
// ==========================================
function submitGift(event) {
    event.preventDefault(); // Prevents the webpage from reloading on submit
    
    // Look for the checked radio option item
    var selectedGift = document.querySelector('input[name="gift"]:checked');
    
    if (!selectedGift) {
        alert("Please select a gift before submitting!");
        return;
    }
    
    // Retrieve the user info saved from the register page
    var name = sessionStorage.getItem("currentUserName") || "Anonymous";
    var phone = sessionStorage.getItem("currentUserPhone") || "No Phone Provided";
    
    // Structure the single entry record object
    var claimRecord = {
        fullName: name,
        phoneNumber: phone,
        giftSelected: selectedGift.value,
        dateClaimed: new Date().toLocaleString()
    };
    
    // Fetch the existing data storage array, or initialize an empty array list if empty
    var database = JSON.parse(localStorage.getItem("giftClaimsDatabase")) || [];
    
    // Push the newest record into our array tracking structure
    database.push(claimRecord);
    
    // Overwrite the localized database string with the newly appended list updates
    localStorage.setItem("giftClaimsDatabase", JSON.stringify(database));
    
    // Hide the selection form structure and make the confirmation panel active
    var formEl = document.getElementById("giftForm");
    var msgEl = document.getElementById("claimMessage");
    var txtEl = document.getElementById("successText");
    
    if (formEl) formEl.style.display = "none";
    if (txtEl) txtEl.innerText = "Congratulations " + name + "! You have selected: " + selectedGift.value;
    if (msgEl) msgEl.style.display = "block";
}

// ==========================================
// 4. HOME REDIRECTION CONTROL (FIXED)
// ==========================================
function goHome() {
    // This now points exactly to your main index file inside your project folder
    window.location.href = 'index.html'; 
}
