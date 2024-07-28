import Test from '../../pages/Test'
import { forEach } from '../../pages/Test';

/*
https://jestjs.io/docs/using-matchers
*/

test('connect',()=>{
    expect(Test()).toBe(1);
})

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy(); //matches anything that an if statement treats as false
});

test('there is no I in team', () => {
    expect('team').not.toMatch(/I/); //checks the string "team" does not contain the letter "I".
});
  
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});




// Mock fetchData function
const fetchData = () => {
    return new Promise((resolve, reject) => {
      // Simulating a successful fetch
      setTimeout(() => resolve('peanut butter'), 100);
    });
};

// Mock fetchData function for failure case
const fetchDataWithError = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('error'), 100); //failed
    });
};

test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchDataWithError();
    } catch (error) {
      expect(error).toMatch('error');
    }
});

//The hooks declared inside a describe block apply only to the tests within that describe block.

// describe('describe outer', () => {
//     console.log('describe outer-a');
  
//     describe('describe inner 1', () => {
//       console.log('describe inner 1');
  
//       test('test 1', () => console.log('test 1'));
//     });
  
//     console.log('describe outer-b');
  
//     test('test 2', () => console.log('test 2'));
  
//     describe('describe inner 2', () => {
//       console.log('describe inner 2');
  
//       test('test 3', () => console.log('test 3'));
//     });
  
//     console.log('describe outer-c');
// });
  


const mockCallback = jest.fn(x => 42 + x); //jest: testing framework, fn: function
test('forEach mock function', () => {
  forEach([0, 1], mockCallback); //items:[0,1], mockCallback: jest.fn(x => 42 + x)

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0); //first 0 is no.of call, second 0 is arugument order

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1); //accesses the first argument of the second call.

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]


//看到mock functionss, .mock property