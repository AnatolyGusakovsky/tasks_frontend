**For each API function following tests should be present:**

1. **Happy Path Testing**: Ensure that the function works as expected under ideal conditions with correct input.
2. **Error Handling**: Test how the function reacts to common errors, such as network issues or server errors.
3. **Validation Checks**: Ensure it rejects invalid inputs appropriately. (since here zod and TS interfaces are used for this, no need to write separate tests)