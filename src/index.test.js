import React from "react";
import { shallow } from "enzyme";
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import ReactDOMServer from '../vendor/react-dom-server.node.development';
import { B } from "./index";

expect.extend({ toMatchImageSnapshot });

test("matches visual snapshot test", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = `
    <!doctype html>
    <head>
        <body>
            ${ReactDOMServer.renderToString(<B msgs={["foo", "bar"]} />)}
        </body>
    </head>
  `;
  page.setContent(content);
  const screenshot = await page.screenshot();

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
                content: "";
            }
            [data-acuity-is-custom-component] [data-acuity-is-custom-component] {
                 position:relative !important;
            }
        </style>
        <body>
            ${ReactDOMServer.renderToString(<B msgs={["foo", "bar"]} />)}
        </body>
    </head>
  `;
  page.setContent(content);
  const screenshot = await page.screenshot();

  expect(screenshot).toMatchImageSnapshot();

  await browser.close();
});
