$(function () {
    let qi = $('.qipan'),
        black = {},
        white = {},
        blank = {},
        ai = true,
        flag = true;
    for (let i = 0; i < 15; i++) {
        $('<i>').appendTo(qi);
        $('<b>').appendTo(qi);
        for (let j = 0; j < 15; j++) {
            blank[i + "_" + j] = true;
            $('<span>').appendTo(qi).addClass('qizi').attr('id', i + '_' + j).data('pos', {x: i, y: j});
        }
    }
    qi.on('click', '.qizi', function () {
        if ($(this).hasClass('black') || $(this).is('.white')) {
            return;
        }
        let data = $(this).data('pos');
        delete blank[data.x + '_' + data.y];
        if (flag) {
            $(this).addClass('black');
            black[data.x + '_' + data.y] = true;
            if (win(data, black) >= 5) {
                console.log('黑棋胜');
                qi.off();
            }
            if (ai) {
                let pos = position();
                $('#' + pos.x + '_' + pos.y).addClass('white');
                white[pos.x + '_' + pos.y] = true;
                delete blank[pos.x + '_' + pos.y];
                if (win(pos, white) >= 5) {
                    console.log('白棋胜');
                    qi.off();
                }
                return;
            }
        } else {
            $(this).addClass('white');
            white[data.x + '_' + data.y] = true;
            if (win(data, white) >= 5) {
                console.log('白棋胜');
                qi.off();
            }
        }
        flag = !flag;
    })

    function win(pos, obj) {
        let h = 1, s = 1, zx = 1, yx = 1,
            x = pos.x, y = pos.y;
        while (obj[x + '_' + (--y)]) {
            h++;
        }
        x = pos.x, y = pos.y;
        while (obj[x + '_' + (++y)]) {
            h++;
        }

        x = pos.x, y = pos.y;
        while (obj[(--x) + '_' + y]) {
            s++;
        }
        x = pos.x, y = pos.y;
        while (obj[(++x) + '_' + y]) {
            s++;
        }

        x = pos.x, y = pos.y;
        while (obj[(--x) + '_' + (++y)]) {
            yx++;
        }
        x = pos.x, y = pos.y;
        while (obj[(++x) + '_' + (--y)]) {
            yx++;
        }

        x = pos.x, y = pos.y;
        while (obj[(--x) + '_' + (--y)]) {
            zx++;
        }
        x = pos.x, y = pos.y;
        while (obj[(++x) + '_' + (++y)]) {
            zx++;
        }
        return Math.max(h, s, yx, zx);
    }

    function position() {
        let score1 = 0, score2 = 0, pos1 = null, pos2 = null;
        for (let i in blank) {
            let obj = {x: i.split('_')[0], y: i.split('_')[1]};
            if (win(obj, black) > score1) {
                score1 = win(obj, black);
                pos1 = obj;
            }
            if (win(obj, white) > score2) {
                score2 = win(obj, white);
                pos2 = obj;
            }
        }
        return score1 > score2 ? pos1 : pos2;
    }
});