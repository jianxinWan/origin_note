// /**
//  * @param {number} x
//  * @return {number}
//  */
// var reverse = function(x) {
//   const str = x.toString();
//   if (str[0] === "-") {
//     return parseInt(
//       "-" +
//         str
//           .slice(1)
//           .split("")
//           .reverse()
//           .join(""),
//       10
//     ) < -2147483648
//       ? 0
//       : parseInt(
//           "-" +
//             str
//               .slice(1)
//               .split("")
//               .reverse()
//               .join(""),
//           10
//         );
//   } else {
//     return parseInt(
//       str
//         .split("")
//         .reverse()
//         .join(""),
//       10
//     ) > 2147483647
//       ? 0
//       : parseInt(
//           str
//             .split("")
//             .reverse()
//             .join(""),
//           10
//         );
//   }
// };
// console.log(reverse(-123456));

// /**
//  * @param {string} s
//  * @return {number}
//  */
// var romanToInt = function (s) {
//     const rule = new Map([
//         ['I', 1],
//         ['V', 5],
//         ['X', 10],
//         ['L', 50],
//         ['C', 100],
//         ['D', 500],
//         ['M', 1000],
//         ['IV', 4],
//         ['IX', 9],
//         ['XL', 40],
//         ['XC', 90],
//         ['CD', 400],
//         ['CM', 900],
//     ])
//     let res = 0;
//     for (let i = 0, len = s.length; i < len; i++) {
//         if (rule.has(s[i] + s[i + 1])) {
//             res += rule.get(s[i] + s[i + 1]);
//             i++;
//         } else {
//             res += rule.get(s[i]);
//         }
//     }
//     return res
// };

// console.log(romanToInt("DCXXI"));

//最长公共字串
// /**
//  * @param {string[]} strs
//  * @return {string}
//  */

// var longestCommonPrefix = function (strs) {
//     let res = "";
//     if (strs.length > 0) {
//         if (strs[0].length > 0) {
//             for (let i = 0, strLen = strs[0].length; i < strLen; i++) {
//                 res += strs[0][i];
//                 for (let j = 1, len = strs.length; j < len; j++) {
//                     if (strs[j].indexOf(res) !== 0) {
//                         return res.slice(0, -1);
//                     }
//                 }
//             }
//             return res;
//         } else {
//             return "";
//         }
//     }
//     if (strs.length === 1) {
//         return strs[0];
//     }
//     return "";
// };
// console.log(longestCommonPrefix(["ca", "a"]));

//括号匹配

// var isValid = function (s) {
//     let stack = [];
//     for (let i = 0, len = s.length; i < len; i++) {
//         let item = s[i];
//         if (item === '(' || item === '[' || item === '{') {
//             stack.push(item)
//         } else {
//             let left = null;
//             switch (item) {
//                 case ')':
//                     left = '(';
//                     break;
//                 case ']':
//                     left = '[';
//                     break;
//                 case '}':
//                     left = '{';
//                     break;
//             }
//             if (left !== stack.pop()) {
//                 return false;
//             }
//         }
//     }
//     return stack.length ? false : true;
// };

// console.log(isValid("[]()"));

// 数组去重

// var removeDuplicates = function (nums) {
//     return Array.from(new Set(nums));
// };
// console.log(removeDuplicates([1, 1, 2]));

// 删除数组中指定元素，不申请新的空间

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// var removeElement = function(nums, val) {
//   const len = nums.length;
//   let sameCount = 0;
//   let temp = null;
//   for (let i = 0; i < len; i++) {
//     if (nums[i] === val) {
//       sameCount++;
//     } else {
//       temp = nums[i];
//       nums[i] = nums[i - sameCount];
//       nums[i - sameCount] = temp;
//     }
//   }
//   console.log(nums, len - sameCount);
//   return len - sameCount;
// };

// removeElement([2, 3, 3, 4, 2], 3);

// 只出现一次的数字

// function getSingle(nums, left, right) {
//   let len = nums.length;
//   let middle = parseInt((left + right) / 2, 10);
//   if (nums[middle] >= nums[len - 1]) {
//     right = middle;
//   } else {
//     left = middle;
//   }
//   if (left === right - 1) {
//     console.log(right);
//     return nums[right];
//   }
//   getSingle(nums, left, right);
// }

// var singleNumber = function(nums) {
//   nums = nums.sort();
//   return getSingle(nums, 0, nums.length - 1);
// };

// var singleNumber = function(nums) {
//   nums = nums.sort();
//   console.log(nums);
//   const len = nums.length;
//   if (nums[0] !== nums[1]) {
//     return nums[0];
//   }
//   if (nums[len - 2] !== nums[len - 1]) {
//     return nums[len - 1];
//   }
//   for (let i = 2; i < len - 1; i++) {
//     if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) {
//       return nums[i];
//     }
//   }
// };
// console.log(
//   singleNumber([
//     17,
//     12,
//     5,
//     -6,
//     12,
//     4,
//     17,
//     -5,
//     2,
//     -3,
//     2,
//     4,
//     5,
//     16,
//     -3,
//     -4,
//     15,
//     15,
//     -4,
//     -5,
//     -6
//   ])
// );

// 搜索插入位置

// var searchInsert = function(nums, target) {};

// 四数之和

// var fourSum = function(nums, target) {
//   const len = nums.length;
//   let res = [];
//   if (len < 4) return [];
//   nums = nums.sort(function(a, b) {
//     if (a < b) {
//       return -1;
//     }
//     if (a > b) {
//       return 1;
//     }
//     return 0;
//   });
//   for (let i = 0; i < len - 3; i++) {
//     //最小的相加大于target
//     if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
//     //当前数加上
//     if (nums[i] + nums[len - 1] + nums[len - 2] + nums[len - 3] < target)
//       continue;
//     //数字重复
//     if (i > 0 && nums[i] === nums[i - 1]) continue;

//     for (let j = i + 1; j < len - 2; j++) {
//       //最小的相加大于target
//       if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
//       //当前数加上
//       if (nums[i] + nums[j] + nums[len - 1] + nums[len - 2] < target) continue;
//       //数字重复
//       if (j - i > 1 && nums[j] === nums[j - 1]) continue;
//       //定义两个指针
//       left = j + 1;
//       right = len - 1;
//       while (left < right) {
//         temp = nums[i] + nums[j] + nums[left] + nums[right];
//         if (temp === target) {
//           res.push([nums[i], nums[j], nums[left], nums[right]]);
//           while (left < right && nums[left] === nums[left + 1]) {
//             left += 1;
//           }
//           while (left < right && nums[right] === nums[right - 1]) {
//             right -= 1;
//           }
//           left += 1;
//           right -= 1;
//         } else if (temp > target) {
//           right -= 1;
//         } else {
//           left += 1;
//         }
//       }
//     }
//   }
//   return res;
// };

// console.log(fourSum([-1, 0, -5, -2, -2, -4, 0, 1, -2], -9));
