const teamMembers = [
    { name: "Paula", role: "Dizainere", age: 21, gender: "Sieviete" },
    { name: "Nils", role: "Programmētājs", age: 21, gender: "Vīrietis" },
    { name: "Emīls", role: "Programmētājs", age: 21, gender: "Vīrietis" }
];

function displayTeam() {
var container = document.getElementById("team-container");
for (var i = 0; i < teamMembers.length; i++) {
var member = teamMembers[i];
var memberDiv = document.createElement("div");
memberDiv.innerHTML = "<h3>" + member.name + "</h3>" +
"<p><strong>Loma:</strong> " + member.role + "</p>" +
"<p><strong>Vecums:</strong> " + member.age + "</p>" +
"<p><strong>Dzimums:</strong> " + member.gender + "</p>";
container.appendChild(memberDiv);
    }
}

window.onload = function() {
    displayTeam();
};