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
            // Update compass display
        });
    })

    $("#solve_btn").on("click", () => {
        $(".action_checkbox").each(function (index) {
            let f = [];
            for (let i = 0; i < 3; i++) {
                f.push(Number($(this).children(".f"+i)[0].checked));
            }
            Compass.setAction(index, f);
        })

        let result = solve();
        let str = "";
        result.forEach(value => {
            str += (value + 1) + " ";
        });

        $(".result>p").html(str);
    })
})