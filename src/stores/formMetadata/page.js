export const CMS_PAGE = {
  title: {
    value: '', label: 'Page Title', error: undefined, rule: 'required',
  },
  slug: {
    value: '', label: 'Page Slug', error: undefined, rule: 'required',
  },
  description: {
    value: ' ', label: 'Page Content', error: undefined, rule: 'required',
  },
  status: {
    value: 'draft', label: 'Status', error: undefined, rule: 'required',
  },
};

export const POST_PAGE = {
  title: {
    value: '', label: 'Post Title', error: undefined, rule: 'required'
  }
}

export const COMMENTS_FORM = {
  description: {
    value: '', error: undefined, rule: 'required'
  }
}