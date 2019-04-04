import { shallowMount } from '@vue/test-utils';
import RecentContacts from '@/components/Wallet/Payments/RecentContacts.vue';
import RecentContactItem from '@/components/Wallet/Payments/RecentContactItem.vue';
import { localVue, i18n } from '../../../../helpers/setupLocalVue';
import { __createMocks as createStoreMocks } from '../../../../../store/__mocks__/store.js';

describe('RecentContacts.vue', () => {
  let storeMocks;
  let wrapper;
  let store;

  function wrapperInit (options) {
    return shallowMount(RecentContacts, options);
  }

  function storeInit (custom) {
    storeMocks = createStoreMocks(custom);
    wrapper = wrapperInit({ i18n, localVue, store: storeMocks.store });
    store = wrapper.vm.$store;
  }

  beforeEach(() => storeInit());

  it('renders and matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders a section with .recent-contacts-list class', () => {
    expect(wrapper.contains('section.recent-contacts-list')).toBe(true);
  });

  it('is hidden if store has payments.isSearchingContacts === true', () => {
    expect(store.state.payments.isSearchingContacts).toBe(false);
    expect(wrapper.isVisible()).toBe(true);
    store.state.payments.isSearchingContacts = true
    expect(wrapper.isVisible()).toBe(false);
  });

  it('renders a h1 with .section-h1 class that contains "Recent" string', () => {
    expect(wrapper.find('h1.section-h1').html().includes('Recent')).toBe(true);
  });

  it('loops through the data and renders multiple RecentContactItem components', () => {
    expect(wrapper.findAll(RecentContactItem).length).toBeGreaterThan(1);
  });
});