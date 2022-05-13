const { palindromo } = require("../utils/palindromo")

test("palindrome of midudev", () => {
    const result = palindromo("midudev")
    expect(result).toBe("vedudim")
})