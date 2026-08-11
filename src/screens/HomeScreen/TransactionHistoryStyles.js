// import { StyleSheet } from 'react-native';
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from '../../utils/responsive';

// import { theme } from '../../MainTheme/theme';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, // Clean white background
//   },

//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(5),
//   },

//   filterRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//     flexWrap: 'wrap',
//     gap: scale(8),
//   },

//   activeFilter: {
//     backgroundColor: theme.colors.primaryBlue, // Blue pill for active
//     color: '#ffffff',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(16),
//     borderRadius: theme.borderRadius.full || 20,
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.medium || '500',
//   },
  
//   dropdownDate: {
//     minWidth: scale(80),
//     height: verticalScale(34),
//     backgroundColor: '#f3f4f6', // Light gray pill matching the image
//     borderRadius: theme.borderRadius.full || 20,
//     paddingHorizontal: scale(12),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },

//   dropdown: {
//     minWidth: scale(100),
//     height: verticalScale(34),
//     backgroundColor: '#f3f4f6', // Light gray pill matching the image
//     borderRadius: theme.borderRadius.full || 20,
//     paddingHorizontal: scale(12),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },

//   dropdownText: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   section: {
//     color: theme.colors.textMain,
//     marginTop: verticalScale(16),
//     marginBottom: verticalScale(16),
//     fontWeight: theme.typography.weight.medium || '500',
//     fontSize: moderateScale(15),
//   },

//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },

//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: scale(12),
//   },

//   avatar: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: scale(12),
//     borderWidth: 1,
//     borderColor: '#e5e7eb', // Delicate light border as seen in the design
//     backgroundColor: '#ffffff',
//   },

//   name: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.medium || '500',
//     fontSize: moderateScale(15),
//     maxWidth: scale(180),
//   },

//   time: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(2),
//   },

//   right: {
//     alignItems: 'flex-end',
//     maxWidth: scale(100),
//   },

//   amount: {
//     color: theme.colors.textMain, // Amounts are dark text in the new design
//     fontWeight: theme.typography.weight.semibold || '600',
//     fontSize: moderateScale(15),
//   },

//   status: {
//     fontSize: moderateScale(10.5),
//     marginTop: verticalScale(2),
//     textTransform: 'capitalize',
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(120),
//   },

//   emptyTitle: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.semibold || '600',
//     marginTop: verticalScale(16),
//   },

//   emptySub: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(14),
//     marginTop: verticalScale(6),
//   },
// });



import { StyleSheet } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

import { theme } from '../../MainTheme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(5),
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    flexWrap: 'wrap',
    gap: scale(8),
  },

  pillButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: theme.borderRadius.full || 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(4),
  },
  
  pillActive: {
    backgroundColor: theme.colors.primaryBlue || '#2563EB',
    borderColor: theme.colors.primaryBlue || '#2563EB',
  },
  
  pillInactive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },

  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: moderateScale(13),
  },
  
  pillTextInactive: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: moderateScale(13),
  },

  activeFilter: {
    backgroundColor: theme.colors.primaryBlue, 
    color: '#ffffff',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.full || 20,
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },
  
  dropdownDate: {
    minWidth: scale(80),
    height: verticalScale(34),
    backgroundColor: '#f3f4f6', 
    borderRadius: theme.borderRadius.full || 20,
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  dropdown: {
    height: verticalScale(34),
    backgroundColor: '#f3f4f6', 
    borderRadius: theme.borderRadius.full || 20,
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  dropdownText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  section: {
    color: theme.colors.textMain,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(15),
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(12),
  },

  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb', 
    backgroundColor: '#ffffff',
  },

  name: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(15),
    maxWidth: scale(180),
  },

  time: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },

  right: {
    alignItems: 'flex-end',
    maxWidth: scale(100),
  },

  amount: {
    color: theme.colors.textMain, 
    fontWeight: theme.typography.weight.semibold || '600',
    fontSize: moderateScale(15),
  },

  status: {
    fontSize: moderateScale(10.5),
    marginTop: verticalScale(2),
    textTransform: 'capitalize',
    fontWeight: theme.typography.weight.medium || '500',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: verticalScale(120),
  },

  emptyTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    marginTop: verticalScale(16),
  },

  emptySub: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(14),
    marginTop: verticalScale(6),
  },
});