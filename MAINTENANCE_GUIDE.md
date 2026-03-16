# Maintenance & Operations Guide

## Quick Reference

### Environment Variables Required
```bash
VDESK_API_KEY=your_api_key_here
```

Validated on every API request. Missing variables will fail with clear error message.

---

## Logging

### How to Enable Debug Logging
```typescript
// In development, set NODE_ENV=development
// All debug logs will appear automatically
```

### Interpreting Log Messages
```
🔴 ERROR  - Critical failure requiring attention
🔵 DEBUG  - Development information (dev only)
🟢 SUCCESS - Operation completed successfully
🟡 WARNING - Potential issue or unusual condition
```

### Common Log Patterns
```
ERROR: Chat API request validation failed
  → Check SendMessageSchema definition

ERROR: Failed to increase timeout for sandbox
  → Sandbox connection issue or invalid ID

ERROR: Error parsing SSE event
  → Malformed streaming response from API

WARNING: Request payload too large
  → Check request size limits (max 1MB)

WARNING: Invalid Content-Type for POST request
  → Verify request headers in client
```

---

## Common Issues & Solutions

### Issue: "VDESK API key not found"
**Cause**: Environment variable not set  
**Solution**: 
```bash
export VDESK_API_KEY=your_key
# or add to .env.local in Next.js
```

### Issue: "Failed to connect to sandbox"
**Cause**: VDESK service unavailable or API error  
**Solution**:
1. Check VDESK service status
2. Verify API key has permissions
3. Check network connectivity
4. Review error logs for details

### Issue: "Race condition detected in timeout"
**Cause**: Should not occur with current guard logic  
**Solution**: This is prevented by `timeoutExtendedRef` flag

### Issue: "Invalid Content-Type"
**Cause**: Request sent with wrong Content-Type header  
**Solution**:
```typescript
// Correct way:
fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
```

### Issue: "Payload too large"
**Cause**: Request body exceeds 1MB limit  
**Solution**:
1. Reduce message count in chat history
2. Compress image data if applicable
3. Implement pagination for large datasets

### Issue: "Error boundary caught error"
**Cause**: Unhandled React component error  
**Solution**:
1. Check error message in browser console
2. Review component stack trace
3. Check for null/undefined references
4. Review recent component changes

---

## Monitoring Checklist

### Daily
- [ ] Check error logs for unusual patterns
- [ ] Verify API response times are acceptable
- [ ] Monitor sandbox creation success rate

### Weekly
- [ ] Review total error count and patterns
- [ ] Check performance metrics
- [ ] Verify accessibility compliance
- [ ] Review security logs

### Monthly
- [ ] Analyze usage patterns
- [ ] Plan performance optimizations
- [ ] Review security vulnerabilities
- [ ] Update dependencies if needed

---

## Performance Tuning

### Optimization Opportunities
1. **API Response Caching**: Implement React Query for SSE responses
2. **Message Compression**: Compress large chat messages
3. **Lazy Loading**: Load components on demand
4. **Image Optimization**: Compress screenshots from sandbox

### Current Performance Metrics
```
API Validation:     ~0.5ms
Middleware Check:   ~1-2ms
Stream Parsing:     ~0.1-0.5ms per event
Error Handling:     <0.1ms (unless error occurs)
```

---

## Security Checklist

### Regular Reviews
- [ ] VDESK API key rotation (every 90 days)
- [ ] Dependency security updates
- [ ] OWASP Top 10 compliance review
- [ ] CSP policy effectiveness

### Security Headers Verification
```bash
# Check headers are present:
curl -I https://your-domain.com
```

Expected headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'...
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Deployment Process

### Pre-Deployment Checklist
```bash
# 1. Run type checking
npm run type-check

# 2. Run linting
npm run lint

# 3. Build the app
npm run build

# 4. Verify environment variables
echo $VDESK_API_KEY

# 5. Test error scenarios
# - Missing API key
# - Invalid request format
# - Oversized payload
```

### Deployment Steps
```bash
# 1. Push code to main/deployment branch
git push origin feature-branch
git checkout main && git pull

# 2. Deploy to Vercel/hosting
# Using Vercel CLI:
vercel deploy --prod

# 3. Verify deployment
# - Check application loads
# - Test chat functionality
# - Verify error logging works
# - Check CSP headers

# 4. Monitor error logs
# Watch logs for the next hour
```

### Post-Deployment
```bash
# 1. Smoke test critical paths
# - Create sandbox
# - Send message
# - Extend timeout
# - Stop sandbox

# 2. Monitor metrics
# - API response time
# - Error rate
# - User feedback

# 3. Document any issues
# Create issues for improvements
```

---

## Rollback Procedure

If deployment causes critical issues:

```bash
# 1. Identify the issue
# Review error logs and symptoms

# 2. Rollback to previous version
vercel rollback  # Uses Vercel's built-in rollback

# 3. Notify stakeholders
# Document what went wrong

# 4. Create post-mortem
# Plan fixes before redeployment
```

---

## Adding New Features

### Validation Schema Pattern
```typescript
// 1. Create schema in lib/utils/validation.ts
export const NewFeatureSchema = z.object({
  field1: z.string().min(1),
  field2: z.number().positive(),
});

// 2. Use in API route
const data = validateInputStrict(NewFeatureSchema, request.body);

// 3. Handle validation errors
// Already handled in middleware error catch
```

### Error Handling Pattern
```typescript
// 1. Try-catch with logging
try {
  // business logic
} catch (error) {
  logError("Context about what failed:", error);
  return new Response("User-friendly message", { status: 400 });
}

// 2. Use error boundary for components
// Automatically caught if not handled
```

### Accessibility Pattern
```typescript
// 1. Add ARIA labels to interactive elements
<Button aria-label="Action description" />

// 2. Use semantic HTML
<nav role="navigation" id="menu">
  
// 3. Test with screen reader
// Use NVDA (Windows) or VoiceOver (Mac)
```

---

## Database Integration (Future)

When adding database support:

```typescript
// 1. Create migration script
// scripts/migrations/001_create_users.sql

// 2. Run migration
npm run migrate

// 3. Update validation schemas
// Add database-specific validation

// 4. Update error handling
// Handle database errors appropriately

// 5. Add logging for DB operations
// logError("Database query failed:", error);
```

---

## Troubleshooting Tools

### Enable Debug Mode
```typescript
// In .env.local
DEBUG=*
NODE_ENV=development
```

### Inspect Network Requests
```
1. Open DevTools (F12)
2. Go to Network tab
3. Look for /api/chat requests
4. Check request/response headers and body
5. Check WebSocket/SSE stream data
```

### Check Logs
```bash
# Local development
npm run dev
# Logs appear in terminal

# Production (Vercel)
vercel logs  # View production logs
```

### Test Validation
```bash
# Test invalid request
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: text/plain" \
  -d "invalid"
# Should return 400 error

# Test oversized payload
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "$(head -c 2000000 < /dev/zero | tr '\0' 'x')"
# Should return 413 error
```

---

## Keeping Dependencies Updated

### Monthly Updates
```bash
# Check for updates
npm outdated

# Update minor/patch versions
npm update

# Review breaking changes in major versions
npm outdated --all
```

### Security Updates
```bash
# Check for security vulnerabilities
npm audit

# Fix known vulnerabilities
npm audit fix

# Fix with dependency upgrade
npm audit fix --force
```

---

## Contact & Escalation

### Issues During Deployment
1. Check error logs: `vercel logs`
2. Review recent commits for breaking changes
3. Consider rollback if critical
4. Document issue and create fix

### Performance Issues
1. Check API response times
2. Look for slow database queries
3. Review error frequency
4. Check resource usage (CPU, memory)

### Security Concerns
1. Review security logs
2. Check for unusual traffic patterns
3. Verify API key integrity
4. Run security audit

---

## Documentation Updates

When making changes:
1. Update relevant markdown files
2. Add JSDoc comments to functions
3. Update ARCHITECTURE_IMPROVEMENTS.md if structure changes
4. Update this guide with new procedures

---

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run type-check      # Check TypeScript
npm run lint           # Run linter

# Building
npm run build          # Build for production

# Deployment
vercel deploy          # Deploy to Vercel
vercel deploy --prod   # Deploy to production

# Maintenance
npm audit              # Check vulnerabilities
npm outdated           # Check outdated packages
npm update             # Update packages
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-17 | Added validation, error boundaries, security improvements |
| 1.0 | Earlier | Initial release |

---

## Support & Resources

- **VDESK Docs**: https://vdesk.dev
- **Next.js Docs**: https://nextjs.org/docs
- **Error Handling**: See IMPLEMENTATION_SUMMARY.md
- **Architecture**: See ARCHITECTURE_IMPROVEMENTS.md

---

**Last Updated**: March 17, 2026  
**Maintained By**: Development Team  
**Next Review**: June 17, 2026
