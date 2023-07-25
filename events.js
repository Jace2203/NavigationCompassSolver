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

        $(this).on("change input", () => {
            let value = $(this).val();
            let str = "";
            for (let i = 0; i < 4; i++) {
                if (i < value)
                    str += "🌕 ";
                else
                    str += "🌑 ";
            }
            $(this).siblings("p").text(str);
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
    
    $(".action_checkbox>input").each(function() {
        $(this).on("click", () => {
            let i = $(this).attr("class")[1];
            let c = "fill:";
            c += ($(this)[0].checked ? "rgb(200,190,120)" : "rgb(62,81,95)");
            c += ";stroke-width:2;stroke:rgb(233,221,153)";
            $(this).parent().siblings("svg").children(".r" + i).attr("style", c);

            let action = $(this).closest(".action");
            let index = action.attr("id")[1]
            let f = [];
            for (let j = 0; j < 3; j++) {
                f.push(Number(action.children(".action_checkbox").children(".f"+j)[0].checked));
            }
            Compass.setAction(index, f);
        });
    });

    $(".action_turn_btn>input").each(function() {
        $(this).on("click", () => {
            let i = $(this).closest(".action").attr("id")[1];
            let f = Compass.getF(i);

            f.forEach((v, index) => {
                let state = $("#s" + index);
                let s = Number(state.attr("value"));
                let m = Compass.getSize()[index];
                
                if (v) {
                    s = (s + 1) % m;
                    state.attr("value", s);
                }
            });
            
            updateCompass();
        })
    })

    $("#solve_btn").on("click", () => {
        let s = [0,0,0];
        $(".state>input").each(function(index) {
            s[index] = Number($(this).attr("value"));
        });

        let result = solve(s);
        let str = "";
        if (result.length) {
            result.forEach(value => {
                let chr = "";
                switch (value) {
                    case 0: chr = "壹" ; break;
                    case 1: chr = "貳" ; break;
                    case 2: chr = "叁" ; break;
                }
                str += chr + " ";
            });
        } else {
            str = "無解";
        }

        $(".result>input[type='text']").attr("value", str);
    })

    updateCompass();
})