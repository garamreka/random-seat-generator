$(document).ready(function() {
    var alpaga = [
        "Berci", "Flora", "Arni", "Balazs", "Kriszta",
        "Vili", "Tomi", "Reka", "Botond", "Evi",
        "Dorka", "Boldi", "Bazsi", "Norbi", "Lori",
        "Gyula", "Loci", "Gergo", "Csilla", "Adri"
    ];
    var newAlpaga = [];
    var alpagaLength = alpaga.length;
    var randomClassmate;
    var random;
    var generator;
    var date = new Date();
    var day = new Date();

    SetDay();
    SetSeed();
    RandomGenerator();
    Print();

    function SetSeed() {
        if (date.getHours() > 16) {
            date = (date.getDate()+1)+(date.getMonth()+1)*100+date.getFullYear()*10000;
        } else {
            date=date.getDate()+(date.getMonth()+1)*100+date.getFullYear()*10000;
        }
        console.log(date);
        generator = SeedRandom(date);
    }

    function RandomGenerator() {
       for (var i = 0; i < alpagaLength; i++) {
            random = Math.floor(generator(alpaga.length));
            randomClassmate = alpaga[random];
            newAlpaga.push(randomClassmate);
            alpaga.splice(random, 1);
        }
    }

    function Print() {
        for (var i = 0; i < alpagaLength; i++) {
            var seat = "#chair" + (i + 1);
            $(seat).text(newAlpaga[i]);
        }
    }

    function SetDay() {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var helloAlpaga;
        var dayIndex = day.getDay();

        if (day.getHours() > 16) {
            dayIndex = day.getDay() + 1;
            console.log(dayIndex);
        }

        helloAlpaga = "Hello Alpaga, here are your seats for " + days[dayIndex];
        $("#hello-alpaga").text(helloAlpaga);
    }

    function SeedRandom(state1,state2){
        var mod1=4294967087
        var mul1=65539
        var mod2=4294965887
        var mul2=65537
        if(typeof state1!="number"){
            state1=+new Date()
        }
        if(typeof state2!="number"){
            state2=state1
        }
        state1=state1%(mod1-1)+1
        state2=state2%(mod2-1)+1
        function random(limit){
            state1=(state1*mul1)%mod1
            state2=(state2*mul2)%mod2
            if(state1<limit && state2<limit && state1<mod1%limit && state2<mod2%limit){
                return random(limit)
            }
            return (state1+state2)%limit
        }
        return random
    }
});