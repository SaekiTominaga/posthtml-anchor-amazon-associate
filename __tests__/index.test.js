import posthtmlAnchorAmazonAssociate from '../dist/index.js';
import posthtml from 'posthtml';
import { describe, expect, test } from '@jest/globals';

describe('正常系', () => {
	test('class 指定', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(
					'<a href="https://www.amazon.com/dp/B01GRDKGZW/" class="amazon-associate">Link</a>'
				)
			).html
		).toBe('<a href="https://www.amazon.com/dp/B01GRDKGZW/ref=nosim?tag=xxx-20">Link</a>');
	});
	test('class 指定（変換対象外）', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(`
					<a href="https://www.amazon.com/dp/B01GRDKGZW/">Link</a>
					<a href="https://www.amazon.com/dp/B01GRDKGZW/" class="foo">Link</a>`)
			).html
		).toBe(`
					<a href="https://www.amazon.com/dp/B01GRDKGZW/">Link</a>
					<a href="https://www.amazon.com/dp/B01GRDKGZW/" class="foo">Link</a>`);
	});
});

describe('異常系', () => {
	test('href 属性無し', async () => {
		expect(
			(await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process('<a class="amazon-associate">Link</a>'))
				.html
		).toBe('<a>Link</a>');
	});
	test('相対パス', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(
					'<a href="/" class="amazon-associate">Link</a>'
				)
			).html
		).toBe('<a href="/">Link</a>');
	});
	test('Amazon のページではない', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(
					'<a href="https://www.amazon.com/xxx/B01GRDKGZW/" class="amazon-associate">Link</a>'
				)
			).html
		).toBe('<a href="https://www.amazon.com/xxx/B01GRDKGZW/">Link</a>');
	});
	test('既にパラメーターがある', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(
					'<a href="https://www.amazon.com/dp/B01GRDKGZW/?tag=xxx-20" class="amazon-associate">Link</a>'
				)
			).html
		).toBe('<a href="https://www.amazon.com/dp/B01GRDKGZW/?tag=xxx-20">Link</a>');
	});
	test('URL 末尾にスラッシュ抜け', async () => {
		expect(
			(
				await posthtml([posthtmlAnchorAmazonAssociate({ class: 'amazon-associate', associate_id: 'xxx-20' })]).process(
					'<a href="https://www.amazon.com/dp/B01GRDKGZW" class="amazon-associate">Link</a>'
				)
			).html
		).toBe('<a href="https://www.amazon.com/dp/B01GRDKGZW">Link</a>');
	});
});
