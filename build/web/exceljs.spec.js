(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* global ExcelJS */
// ExcelJS is a global injected by `./dist/exceljs.js` during jasmine's setup

'use strict';

function unexpectedError(done) {
  return function (error) {
    // eslint-disable-next-line no-console
    console.error('Error Caught', error.message, error.stack);
    expect(true).toEqual(false);
    done();
  };
}
describe('ExcelJS', function () {
  it('should read and write xlsx via binary buffer', function (done) {
    var wb = new ExcelJS.Workbook();
    var ws = wb.addWorksheet('blort');
    ws.getCell('A1').value = 'Hello, World!';
    ws.getCell('A2').value = 7;
    wb.xlsx.writeBuffer().then(function (buffer) {
      var wb2 = new ExcelJS.Workbook();
      return wb2.xlsx.load(buffer).then(function () {
        var ws2 = wb2.getWorksheet('blort');
        expect(ws2).toBeTruthy();
        expect(ws2.getCell('A1').value).toEqual('Hello, World!');
        expect(ws2.getCell('A2').value).toEqual(7);
        done();
      });
    }).catch(function (error) {
      throw error;
    }).catch(unexpectedError(done));
  });
  it('should read and write xlsx via base64 buffer', function (done) {
    var options = {
      base64: true
    };
    var wb = new ExcelJS.Workbook();
    var ws = wb.addWorksheet('blort');
    ws.getCell('A1').value = 'Hello, World!';
    ws.getCell('A2').value = 7;
    wb.xlsx.writeBuffer(options).then(function (buffer) {
      var wb2 = new ExcelJS.Workbook();
      return wb2.xlsx.load(buffer.toString('base64'), options).then(function () {
        var ws2 = wb2.getWorksheet('blort');
        expect(ws2).toBeTruthy();
        expect(ws2.getCell('A1').value).toEqual('Hello, World!');
        expect(ws2.getCell('A2').value).toEqual(7);
        done();
      });
    }).catch(function (error) {
      throw error;
    }).catch(unexpectedError(done));
  });
  it('should write csv via buffer', function (done) {
    var wb = new ExcelJS.Workbook();
    var ws = wb.addWorksheet('blort');
    ws.getCell('A1').value = 'Hello, World!';
    ws.getCell('B1').value = 'What time is it?';
    ws.getCell('A2').value = 7;
    ws.getCell('B2').value = '12pm';
    wb.csv.writeBuffer().then(function (buffer) {
      expect(buffer.toString()).toEqual('"Hello, World!",What time is it?\n7,12pm');
      done();
    }).catch(function (error) {
      throw error;
    }).catch(unexpectedError(done));
  });
});


},{}]},{},[1]);
