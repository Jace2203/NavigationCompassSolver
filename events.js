let turn = (i, t) => {
    let light = $("#light_"+i);
    light.attr("transform", "rotate(" + t + ",175,175)");
    if (t === 0)
    {
        light.attr("style", "fill:aqua");
    }
    else
    {
        light.attr("style", "fill:orange");
    }
}

let updateCompass = () => {
    let s = [0,0,0];
    $(".state").children().each(function() {
        let i = $(this).attr("id")[1];
        s[i] = $(this).attr("value");
    });
    s.forEach((v, i) => {
        let t = v * angle(i, Compass);
        turn(i, t);
    })
}

$(document).ready(() => {
    $(".ring_slider").each(function() {
        $(this).on("change", () => {
            let value = $(this).val();
            $(this).siblings("p").text(value);
            switch ($(this).attr("id"))
            {
                case "z0": i = 0; break;
                case "z1": i = 1; break;
                case "z2": i = 2; break;
            }
            Compass.setSize(i, Number(value));
            Compass.getSize().forEach((z, i) => {
                $("#s" + i).attr("max", z);
                $("#s" + i).attr("value", 0);
            });
            updateCompass();
        });
    })

    $(".turn_btns>input").each(function() {
        $(this).on("click", () => {
            let i = $(this).attr("id")[6];
            let s = Number($("#s" + i).attr("value"));
            let m = Compass.getSize()[i];
            s = (s + 1) % m;
            $("#s" + i).attr("value", s);
            updateCompass();
        })
    })

    $("#solve_btn").on("click", () => {
        let s = [0,0,0];

        $(".action_checkbox").each(function(index) {
            let f = [];
            for (let i = 0; i < 3; i++) {
                f.push(Number($(this).children(".f"+i)[0].checked));
            }
            Compass.setAction(index, f);
        });
        $(".state>input").each(function(index) {
            s[index] = Number($(this).attr("value"));
        });

        let result = solve(s);
        let str = "";
        result.forEach(value => {
            str += (value + 1) + " ";
        });

        $(".result>p").html(str);
    })

    updateCompass();
})