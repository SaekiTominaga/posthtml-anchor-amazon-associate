import PostHTMLMatchClass from '@saekitominaga/posthtml-match-class';
export default (options) => {
    const targetElementInfo = {
        class: options.class,
    };
    const associateInfo = {
        id: options.associate_id,
    };
    return (tree) => {
        tree.match({ tag: 'a' }, (node) => {
            const content = node.content;
            const attrs = node.attrs;
            const postHTMLMatchClass = new PostHTMLMatchClass(node);
            if (!postHTMLMatchClass.refine(targetElementInfo.class)) {
                return node;
            }
            if (attrs?.href === undefined) {
                console.warn('No `href` attribute', node);
                return node;
            }
            if (!attrs.href.match(/^https:\/\/www\.amazon\.[a-z]+(\.[a-z]+)?\/dp\/([\dA-Z]{10})\/$/)) {
                console.warn('URL is not from Amazon product page', node);
                return node;
            }
            attrs.href = `${attrs.href}ref=nosim?tag=${associateInfo.id}`; // https://affiliate-program.amazon.com/help/node/topic/GP38PJ6EUR6PFBEC
            return {
                tag: 'a',
                attrs: attrs,
                content: content,
            };
        });
        return tree;
    };
};
//# sourceMappingURL=index.js.map