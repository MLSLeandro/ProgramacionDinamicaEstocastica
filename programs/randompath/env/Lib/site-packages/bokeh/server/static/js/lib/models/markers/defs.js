import { Marker, MarkerView } from "./marker";
const SQ3 = Math.sqrt(3);
function _one_line(ctx, r) {
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
}
function _one_x(ctx, r) {
    ctx.moveTo(-r, r);
    ctx.lineTo(r, -r);
    ctx.moveTo(-r, -r);
    ctx.lineTo(r, r);
}
function _one_cross(ctx, r) {
    ctx.moveTo(0, r);
    ctx.lineTo(0, -r);
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
}
function _one_diamond(ctx, r) {
    ctx.moveTo(0, r);
    ctx.lineTo(r / 1.5, 0);
    ctx.lineTo(0, -r);
    ctx.lineTo(-r / 1.5, 0);
    ctx.closePath();
}
function _one_hex(ctx, r) {
    const r2 = r / 2;
    const h = SQ3 * r2;
    ctx.moveTo(r, 0);
    ctx.lineTo(r2, -h);
    ctx.lineTo(-r2, -h);
    ctx.lineTo(-r, 0);
    ctx.lineTo(-r2, h);
    ctx.lineTo(r2, h);
    ctx.closePath();
}
function _one_tri(ctx, r) {
    const h = r * SQ3;
    const a = h / 3;
    ctx.moveTo(-r, a);
    ctx.lineTo(r, a);
    ctx.lineTo(0, a - h);
    ctx.closePath();
}
function asterisk(ctx, i, r, line, _fill) {
    const r2 = r * 0.65;
    _one_cross(ctx, r);
    _one_x(ctx, r2);
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function circle(ctx, i, r, line, fill) {
    ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function circle_cross(ctx, i, r, line, fill) {
    ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        _one_cross(ctx, r);
        ctx.stroke();
    }
}
function circle_x(ctx, i, r, line, fill) {
    ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        _one_x(ctx, r);
        ctx.stroke();
    }
}
function cross(ctx, i, r, line, _fill) {
    _one_cross(ctx, r);
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function diamond(ctx, i, r, line, fill) {
    _one_diamond(ctx, r);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function diamond_cross(ctx, i, r, line, fill) {
    _one_diamond(ctx, r);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        _one_cross(ctx, r);
        ctx.stroke();
    }
}
function hex(ctx, i, r, line, fill) {
    _one_hex(ctx, r);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function inverted_triangle(ctx, i, r, line, fill) {
    ctx.rotate(Math.PI);
    _one_tri(ctx, r);
    ctx.rotate(-Math.PI);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function square(ctx, i, r, line, fill) {
    const size = 2 * r;
    ctx.rect(-r, -r, size, size);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function square_cross(ctx, i, r, line, fill) {
    const size = 2 * r;
    ctx.rect(-r, -r, size, size);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        _one_cross(ctx, r);
        ctx.stroke();
    }
}
function square_x(ctx, i, r, line, fill) {
    const size = 2 * r;
    ctx.rect(-r, -r, size, size);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        _one_x(ctx, r);
        ctx.stroke();
    }
}
function triangle(ctx, i, r, line, fill) {
    _one_tri(ctx, r);
    if (fill.doit) {
        fill.set_vectorize(ctx, i);
        ctx.fill();
    }
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function dash(ctx, i, r, line, _fill) {
    _one_line(ctx, r);
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function x(ctx, i, r, line, _fill) {
    _one_x(ctx, r);
    if (line.doit) {
        line.set_vectorize(ctx, i);
        ctx.stroke();
    }
}
function _mk_model(type, f) {
    var _a;
    const view = class extends MarkerView {
        static initClass() {
            this.prototype._render_one = f;
        }
    };
    view.initClass();
    const model = (_a = class extends Marker {
            static initClass() {
                this.prototype.default_view = view;
            }
        },
        _a.__name__ = type,
        _a);
    model.initClass();
    return model;
}
// markers are final, so no need to export views
export const Asterisk = _mk_model('Asterisk', asterisk);
export const CircleCross = _mk_model('CircleCross', circle_cross);
export const CircleX = _mk_model('CircleX', circle_x);
export const Cross = _mk_model('Cross', cross);
export const Dash = _mk_model('Dash', dash);
export const Diamond = _mk_model('Diamond', diamond);
export const DiamondCross = _mk_model('DiamondCross', diamond_cross);
export const Hex = _mk_model('Hex', hex);
export const InvertedTriangle = _mk_model('InvertedTriangle', inverted_triangle);
export const Square = _mk_model('Square', square);
export const SquareCross = _mk_model('SquareCross', square_cross);
export const SquareX = _mk_model('SquareX', square_x);
export const Triangle = _mk_model('Triangle', triangle);
export const X = _mk_model('X', x);
export const marker_funcs = {
    asterisk,
    circle,
    circle_cross,
    circle_x,
    cross,
    diamond,
    diamond_cross,
    hex,
    inverted_triangle,
    square,
    square_cross,
    square_x,
    triangle,
    dash,
    x,
};
//# sourceMappingURL=defs.js.map