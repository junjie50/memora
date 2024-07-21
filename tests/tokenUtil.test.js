import { getTokenFrom } from "../utils/tokenUtil";

// Unit testing for the backend.
test('the token can be retrived', async () => {
    const token = "DSAFDSAFSDVCXV@#$@#$";
    const test_string = "BEARER " + token;
    const ans = getTokenFrom(test_string);
    assert(ans === token);
})