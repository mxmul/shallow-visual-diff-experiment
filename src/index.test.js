import React from "react";
import puppeteer from 'puppeteer';
import ReactDOMServer from '../vendor/react-dom-server.node.development';
import { B } from "./index";

test("matches visual snapshot test", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <!doctype html>
    <head>
        <body>
            <div id="acuity-component">
                ${ReactDOMServer.renderToString(<B msgs={["foo", "bar"]} />)}
            </div>
        </body>
    </head>
  `;
  page.setContent(content);

  const elementHandle = await page.$('#acuity-component');
  const screenshot = await elementHandle.screenshot();

  expect(screenshot).toMatchImageSnapshot();

  await browser.close();
});

test("matches shallow visual snapshot test", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <!doctype html>
    <head>
        <style>
            [data-acuity-is-custom-component] [data-acuity-is-custom-component]::before {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: hotpink;
                text-align: center;
                content: attr(data-acuity-component-name);
                visibility: visible;
            }
            [data-acuity-is-custom-component] [data-acuity-is-custom-component] {
                position: relative !important;
                visibility: hidden !important;
            }
        </style>
        <body>
            <div id="acuity-component">
                ${ReactDOMServer.renderToString(<B msgs={["foo", "bar"]} />)}
            </div>
        </body>
    </head>
  `;
  page.setContent(content);

  const elementHandle = await page.$('#acuity-component');
  const screenshot = await elementHandle.screenshot();

  expect(screenshot).toMatchImageSnapshot();

  await browser.close();
});
