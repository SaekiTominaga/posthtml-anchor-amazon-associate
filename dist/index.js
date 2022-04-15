export default (options) => {
    const targetElementInfo = {
        class: options.class,
    };
    const associateInfo = {
        id: options.associate_id,
    };
    /**
     * Narrowing by class name
     *
     * <p class="foo bar"> → <p class="foo bar"> (return false)
     * <p class="foo TARGET bar"> → <p class="foo bar"> (return true)
     *
     * @param {object} node - Target node
     * @param {string} targetClassName - Searches if the target node contains this class name
     *
     * @returns {boolean} Whether the target node contains the specified class name
     */
    const narrowingClass = (node, targetClassName) => {
        const attrs = node.attrs;
        if (attrs?.class === undefined) {
            /* class 属性がない場合 */
            return false;
        }
        const classList = attrs.class.trim().split(/[\t\n\f\r ]+/g);
        if (!classList.includes(targetClassName)) {
            /* 当該クラス名がない場合 */
            return false;
        }
        /* 指定されたクラス名を除去した上で変換する */
        const newClass = classList.filter((className) => className !== targetClassName && className !== '').join(' ');
        attrs.class = newClass !== '' ? newClass : undefined;
        return true;
    };
    return (tree) => {
        tree.match({ tag: 'a' }, (node) => {
            const content = node.content;
            const attrs = node.attrs;
            if (!narrowingClass(node, targetElementInfo.class)) {
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