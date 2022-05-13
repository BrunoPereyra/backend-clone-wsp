const { average } = require("../utils/palindromo")
describe("average", () => {
    test("of value is the value it self", () => {
        expect(average([1])).toBe(1)
    })
    test("of many is calculate correctly",()=>{
        expect(average([1,2,3,4,5,6])).toBe(3.5)
    })
    test("wait zero",()=>{
        expect(average([])).toBe(0)
    })
})
