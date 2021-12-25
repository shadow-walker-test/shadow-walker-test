Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.Button = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = (0, tslib_1.__importDefault)(require("@shadow-walker-test/theme"));
const Button = (props) => {
    const { children, text } = props;
    const buttonStyle = {
        color: theme_1.default.palette.white,
        backgroundColor: theme_1.default.palette.primary,
        padding: theme_1.default.spacing.small,
    };
    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ style: buttonStyle }, { children: [children, " - ", text, " - 3243"] }), void 0));
};
exports.Button = Button;
function add(x, y) {
    return x + y;
}
exports.add = add;
